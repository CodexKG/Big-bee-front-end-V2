import { FC } from "react";
import styles from "./DefaultButton.module.scss";
import { Button } from "antd";
interface IDefaultBtn {
  classes?: string;
  children: string;
}
const DefaultButton: FC<IDefaultBtn> = ({ children, classes, ...props }) => {
  return (
    <Button
      {...props}
      className={`${styles.default_btn} ${classes ? classes : ""}`}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
