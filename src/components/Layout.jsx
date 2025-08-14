import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <div className="app-container">
        <NavbarMenu />
        <Container className="main-content py-4">
          <Outlet />
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
