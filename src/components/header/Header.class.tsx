import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from "react-i18next";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
interface State extends LanguageState {

}

export class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, State> {


    constructor(props) {

        super(props);
        const storeLangState = store.getState();
        this.state = {
            language: storeLangState.language,
            languageList: storeLangState.languageList
        }

    }

    componentDidMount(): void {
        store.subscribe(this.handleStoreDataChnage);
    }

    handleStoreDataChnage = () => {
        const newStoreState = store.getState();
        this.setState({ language: newStoreState.language });

    }

    langMenuSwitchHandler = (e) => {
        store.dispatch(changeLanguageActionCreator(e.key));
    }

    render() {
        const { navigate, t } = this.props;
        return (<div className={styles['app-header']}>
            <div className={styles['top-header']}>
                {/* <div  className={styles.inner}> */}
                <Typography.Text>Welcome</Typography.Text>
                <Dropdown.Button
                    style={{ marginLeft: 15 }}
                    overlay={<Menu onClick={this.langMenuSwitchHandler}
                        items={this.state.languageList.map(m => { return { key: m.code, label: m.name } })
                        } />}
                    icon={<GlobalOutlined />}> {this.state.language === "en" ? "ENG" : "中"} </Dropdown.Button>

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
                    <Input.Search className={styles['search-input']} placeholder={t("header.search_tips")} />
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
        </div >)
    }
}

export const Header = withTranslation()(withRouter(HeaderComponent));