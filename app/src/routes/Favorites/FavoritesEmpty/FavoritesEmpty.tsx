import React from "react";
import classes from "./FavoritesEmpty.module.scss";
import folder_Icon from "assets/icon/favoritesFolder.svg";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Link from "antd/es/typography/Link";
const FavoritesEmpty: React.FC = () => {
  const { Title, Text } = Typography;
  const navigate = useNavigate()
  return (
    <div className={classes.no_login}>
      <img src={folder_Icon} alt="" />
      <Title level={3}>В избранном пусто</Title>
      <Text>
      Жмите ♡ на странице товара и добавляйте сюда то, что нравится. И если цена на эти товары упадёт, мы вам напишем.
      </Text>
      <Link href="/" className={classes.login_link} >На главную</Link>
    </div>
  );
};

export default FavoritesEmpty;