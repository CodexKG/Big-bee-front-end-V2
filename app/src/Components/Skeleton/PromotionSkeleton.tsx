import { FC, useState } from "react";
import { Skeleton, Row, Col, Space } from "antd";
import { DotChartOutlined, FileImageOutlined } from "@ant-design/icons";
type SizeType = "default" | "small" | "large";
const SkeletonImage: FC<any> = ({ styleProps }) => {
  return (
    <Skeleton.Node active style={styleProps}>
      <FileImageOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
    </Skeleton.Node>
  );
};
const SkeletonBlock: FC<any> = ({ styleProps }) => {
  return (
    <Skeleton.Node active style={styleProps}>
      <FileImageOutlined style={{ display: "none" }} />
    </Skeleton.Node>
  );
};
const PromotionSkeleton: FC = () => {
  const [size, setSize] = useState<SizeType>("default");
  return (
    <div>
      <SkeletonImage styleProps={{ width: "300px", height: "400px" }} />
      <br />
      <br />
      <Space>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>
      <br />
      <br />
      <Row>
        <SkeletonBlock styleProps={{ width: "300px", height: "25px" }} />
        <br />
        <br />
        <SkeletonBlock styleProps={{ width: "200px", height: "25px" }} />
      </Row>
      <br />
      <br />
      <Row>
        <SkeletonBlock styleProps={{ width: "300px", height: "20px" }} />
        <br />
        <br />
        <SkeletonBlock styleProps={{ width: "200px", height: "20px" }} />
      </Row>
      <br />
      <SkeletonBlock styleProps={{ width: "300px", height: "40px" }} />

    </div>
  );
};

export default PromotionSkeleton;
