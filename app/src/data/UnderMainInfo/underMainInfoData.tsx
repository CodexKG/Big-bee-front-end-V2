import {
  CalendarTwoTone,
  GiftTwoTone,
  HomeTwoTone,
  InteractionTwoTone,
} from "@ant-design/icons";
import { UnderMainInfoDataType } from "interfaces/statik";

export const UnderMainInfoData: UnderMainInfoDataType[] = [
  {
    id: 1,
    icon: <HomeTwoTone twoToneColor="#ffd000" />,
    title: "Home Delivery Available",
    content:
      "Get your beauty products delivered straight to your door, saving you time and effort.",
  },
  {
    id: 2,
    icon: <CalendarTwoTone twoToneColor="#ffd000" />,
    title: "3-year warranty",
    content:
      "Feel confident with our 3-year warranty on beauty products, providing you with peace of mind and protection against potential defects or issues.",
  },
  {
    id: 3,
    icon: <InteractionTwoTone twoToneColor="#ffd000" />,
    title: "Free shipping on returns",
    content:
      "Enjoy the convenience of free shipping on returns, making the return process easy and convenient for you.",
  },
  {
    id: 4,
    icon: <GiftTwoTone twoToneColor="#ffd000" />,
    title: "15% off for our loyal customer",
    content:
      "Sign up for our newsletter and stay in the loop! Get exclusive discounts, product updates, and special offers delivered straight to your inbox.",
  },
];
