import React from "react";
import classes from "./NoLogin.module.scss";
import folder_Icon from "assets/icon/favoritesFolder.svg";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
const NoLogin: React.FC = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate()
  return (
    <div className={classes.no_login}>
      <img src={folder_Icon} alt="" />
      <Title level={3}>Войдите в учётную запись</Title>
      <Text>
        Так вы сможете видеть сохранённые товары на любых устройствах. Это
        удобно!
      </Text>
      <Button className={classes.login_btn} onClick={()=>navigate('/login')}>Войти</Button>
    </div>
  );
};

export default NoLogin;
