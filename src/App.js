import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { routes } from "./routes";
import DefaultComponents from "./components/DefaultComponents";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "./redux/slices/userSlice";
import FooterComponent from "./components/FooterComponent";
import ModelSingIn from "./components/ModelSingIn";
import * as UserServcie from "./services/userServices";
import HeaderComponents from "./components/HeaderComponents";
import LoadingFullComponents from "./components/LoadingFullComponents";

function App() {
  // useEffect(() => {
  //   fetchAPI()
  // }, [])

  // const fetchAPI = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI })
  // console.log(query)

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const { storageData, decoded } = handleDecoded();
  //   // if (decoded?.id) {
  //   //   handleGetDetailsUser(decoded?.id, storageData);
  //   // }
  //   setIsLoading(false);
  // }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  const [openModel, setOpenModel] = useState(false);

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      //Chạy vào đây trước khi getDetails, mình sẽ check nếu token hết hạn (decoded?.exp < currentTime.getTime() / 1000),
      //thì sẽ gọi đến refreshToken và lấy thằng access token mới đập vào thằng config, và getDetails sẽ có access token mới
      //decoded?.exp là thời gian token hết hạn
      const currentTime = new Date(); //thời gian hiện tại
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwt_decode(refreshToken);

      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        if (decoded?.exp < currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          const storageData = localStorage.getItem("access_token");
          config.headers["token"] = `Bearer ${storageData.slice(1, -1)}`;
        }
      } else {
        setOpenModel(true);
        const res = await UserServcie.logoutUser();
        if (res.status === "OK") {
          dispatch(resetUser());
        }
        localStorage.setItem("email", JSON.stringify(false));

        // dispatch(resetUser());
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  //Dùng lưu trong storage ở redux thì ko cần dùng ở đây
  // const handleGetDetailsUser = async (id, token) => {
  //   console.log("id update", id);
  //   let storageRefreshToken = localStorage.getItem("refresh_token");
  //   const refreshToken = JSON.parse(storageRefreshToken);
  //   console.log("refreshToken", refreshToken);
  //   console.log("token", token);
  //   const res = await UserService.getDetailsUser(id, token);
  //   console.log("chayyyyyyyy");
  //   dispatch(
  //     updateUser({
  //       ...res?.data,
  //       access_token: token,
  //       refreshToken: refreshToken,
  //     })
  //   );
  //   setIsLoading(false);
  // };

  const [showHeader, setShowHeader] = useState("header");

  const handleWheel = (event) => {
    const deltaY = event.deltaY;

    if (deltaY > 0) {
      setShowHeader("header translateY-100");
    } else {
      setShowHeader("header translateY0");
    }
  };

  return (
    <div onWheel={handleWheel} className="web-store">
      {/* <HeaderComponents /> */}
      <LoadingFullComponents isLoading={isLoading} />
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            // const isCheckAuth = !route.isPrivate || user.isAdmin //nếu isPrivate flase thì hiển thị bth, còn true thì hiển thị user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponents : Fragment;
            const LayoutFooter = route.isShowFooter
              ? FooterComponent
              : Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <Layout>
                      {route.isShowHeader && route.isScroll ? (
                        <HeaderComponents class={showHeader} />
                      ) : (
                        <HeaderComponents class="header" />
                      )}
                      <Page />
                      {openModel && <ModelSingIn />}
                      <LayoutFooter />
                    </Layout>
                  </>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
