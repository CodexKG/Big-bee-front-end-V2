

import { HeaderComponent,Promotion } from "Components";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Layout>
        <HeaderComponent />
        <Promotion/>
        <Outlet />
        <footer>fds</footer>
      </Layout>
    </Layout>
  );
}
