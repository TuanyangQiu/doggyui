import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { changeLanguageActionCreator } from '../../redux/language/languageActions';
import { useTranslation } from "react-i18next";
export const Header: React.FC = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const language = useSelector(state => state.language.language);
    const languageList = useSelector(state => state.language.languageList);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const langMenuSwitchHandler = (e) => {
        dispatch(changeLanguageActionCreator(e.key));
    }
    return <div className={styles['app-header']}>
        <div className={styles['top-header']}>
            {/* <div  className={styles.inner}> */}
            <Typography.Text>Welcome</Typography.Text>
            <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={<Menu onClick={langMenuSwitchHandler}
                    items={languageList.map(m => { return { key: m.code, label: m.name } })} />}
                icon={<GlobalOutlined />}>{language === "en" ? "ENG" : "中文"} </Dropdown.Button>

            <Button.Group className={styles['button-group']}>
                <Button onClick={() => navigate("/register")} >{t("header.register")}</Button>
                <Button onClick={() => navigate("/signin")} >{t("header.signin")}</Button>
            </Button.Group>
            {/* </div> */}
        </div>
        <Layout.Header className={styles['main-header']}>
            <div style={{ position: "absolute", width: 500 }} onClick={() => navigate("/")}>
                <img src={logo} alt="logo" className={styles['App-logo']} />
                <Typography.Title className={styles.title} level={3}>Doggy Travel</Typography.Title>
            </div>
            <div style={{ marginLeft: 200 }} >
                <Input.Search
                    className={styles['search-input']}
                    placeholder='please input travel destination, countries, types'
                    onSearch={keyword => navigate(`/search/${keyword}`)} />
            </div>


        </Layout.Header>
        <Menu mode={"horizontal"}
            items={[
                { key: "1", label: t("header.home_page") },
                { key: "2", label: t("header.group") },
                { key: "3", label: t("header.backpack") },
                { key: "4", label: t("header.private") },
                { key: "5", label: t("header.cruise") },
                { key: "6", label: t("header.hotel") },
                { key: "7", label: t("header.local") },
                { key: "8", label: t("header.theme") },
                { key: "9", label: t("header.custom") },
                { key: "10", label: t("header.visa") },
                { key: "11", label: t("header.enterprise") },
                { key: "12", label: t("header.high_end") },
                { key: "13", label: t("header.outdoor") },
                { key: "14", label: t("header.insurance") }]}
            className={styles['main-menu']}></Menu>
    </div>;
}