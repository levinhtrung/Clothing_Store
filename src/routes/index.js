import HomePage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import MyOrderPage from "../pages/MyOrderPage";
import NotFoundPage from "../pages/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProposePage from "../pages/ProposePage";
import ProfilePage from "../pages/ProfilePage";
import AdminPage from "../pages/AdminPage";
import ProductSearchPage from "../pages/ProductSearchPage";
import PaymentPage from "../pages/PaymentPage";
import DetailsOrderPage from "../pages/DetailsOrderPage";
import ProductNamPage from "../pages/ProductNamPage";
import ProductNuPage from "../pages/ProductNuPage";
import ProductBestPage from "../pages/ProductBestPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/details-order/:id",
    page: DetailsOrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product/Nam",
    page: ProductNamPage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/product/Nu",
    page: ProductNuPage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/product/Best",
    page: ProductBestPage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product-search",
    page: ProductSearchPage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/propose",
    page: ProposePage,
    isShowHeader: true,
    isShowFooter: true,
    isScroll: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isShowFooter: true,
    isPrivate: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
