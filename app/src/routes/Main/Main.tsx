

import { HeaderComponent, SubWithNews } from "Components";
import FooterComponent from "Components/FooterComponent/FooterComponent";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Layout>
        <HeaderComponent />
        <Outlet />
        <SubWithNews />
        <FooterComponent />
      </Layout>
    </Layout>
  );
}
