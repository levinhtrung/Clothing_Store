import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";

const FooterComponent = () => {
  return (
    <div className="footer-web">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h4 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  FIVE MAN STORE
                </h4>
                <p>
                  Cảm ơn bạn đã ghé thăm website của chúng tôi. Chúng tôi hy
                  vọng bạn sẽ có một trải nghiệm mua sắm thú vị và hài lòng.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h4 className="text-uppercase fw-bold mb-4">Mạng xã hội</h4>
                <a
                  href="https://www.facebook.com/khiem.ngoc.142240/"
                  target="_blank"
                  className="text-reset"
                >
                  <p className="item">
                    <FaFacebook />
                    <span>Facebook</span>
                  </p>
                </a>
                <a
                  href="https://github.com/khiemfe"
                  target="_blank"
                  className="text-reset"
                >
                  <p className="item">
                    {" "}
                    <FaGithub />
                    <span>Github</span>
                  </p>
                </a>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h4 className="text-uppercase fw-bold mb-4">
                  Kết nối với chúng tôi
                </h4>
                <p className="item">
                  <IoHomeOutline />
                  <span>Đà Nẵng</span>
                </p>
                <p className="item">
                  <MdOutlineEmail />
                  <span>khiemdev24@gmail.com</span>
                </p>
                <p className="item">
                  <FaSquarePhone /> <span>0353454096</span>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023
          <a
            style={{ marginLeft: "5px" }}
            className="text-reset fw-bold"
            href="https://fiveman-store.vercel.app/"
          >
            Five Man Store
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default FooterComponent;
