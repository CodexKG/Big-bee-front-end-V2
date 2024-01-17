

import { HeaderComponent } from "Components";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Layout>
        <HeaderComponent />
        <Outlet />
        <footer>fds</footer>
      </Layout>
    </Layout>
  );
}
