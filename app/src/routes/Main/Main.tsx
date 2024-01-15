

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <Layout style={{ overflow: "hidden" }}>
      <Layout>
        <header>fs</header>
        <Outlet />
        <footer>fds</footer>
      </Layout>
    </Layout>
  );
}
