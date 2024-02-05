

import { HeaderComponent, SubWithNews } from "Components";
import FooterComponent from "data/FooterComponent/FooterComponent";
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
