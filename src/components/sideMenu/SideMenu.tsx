import React from "react";
import Styles from './SideMenu.module.css';
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined, GiftOutlined } from "@ant-design/icons";
export const SideMenu: React.FC = () => {
    return (
        <Menu
            className={Styles["side-menu"]}
            mode={"vertical"}
            items={sideMenuList.map((m) =>
            ({
                label: m.title,
                key: m.title,
                icon: <GiftOutlined />,
                children: m.subMenu.map((sm) =>
                ({
                    label: sm.title,
                    key: sm.title,
                    icon: <GiftOutlined />,
                    children: sm.subMenu.map((sm1) => ({ label: sm1, key: sm1, icon: <GiftOutlined /> }))
                }))
            }))} >
        </Menu>
    );
}