import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withRouter, RouteComponentProps } from "../../helpers/withRouter";
import store from "../../redux/store";
import { LanguageState } from "../../redux/languageReducer";

interface State extends LanguageState {

}

export class HeaderComponent extends React.Component<RouteComponentProps, State> {
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

        // console.log("menu clicked event:  ", e);
        const action = { type: "change_language", payload: e.key };
        store.dispatch(action);
    }

    render() {
        const { navigate } = this.props;
        return (<div className={styles['app-header']}>
            <div className={styles['top-header']}>
                {/* <div  className={styles.inner}> */}
                <Typography.Text>Welcome</Typography.Text>
                <Dropdown.Button
                    style={{ marginLeft: 15 }}
                    overlay={<Menu onClick={this.langMenuSwitchHandler}
                        items={this.state.languageList.map(m => { return { key: m.code, label: m.name } })
                            // [{ key: "1", label: "中文" },
                            // { key: "2", label: "English" }]
                        } />}
                    icon={<GlobalOutlined />}> {this.state.language === "en" ? "ENG" : "中"} </Dropdown.Button>

                <Button.Group className={styles['button-group']}>
                    <Button onClick={() => navigate("/register")} >Register</Button>
                    <Button onClick={() => navigate("/signin")} >Sign In</Button>
                </Button.Group>
                {/* </div> */}
            </div>
            <Layout.Header className={styles['main-header']}>
                <div style={{ position: "absolute", width: 500 }} onClick={() => navigate("/")}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title className={styles.title} level={3}>Doggy Travel</Typography.Title>
                </div>
                <div style={{ marginLeft: 200 }} >
                    <Input.Search className={styles['search-input']} placeholder='please input travel destination, countries, types' />
                </div>


            </Layout.Header>

            <Menu mode={"horizontal"}
                items={[
                    { key: "1", label: "MainPage" },
                    { key: "2", label: "Fligts" },
                    { key: "3", label: "Trains" },
                    { key: "4", label: "Car Rentals" },
                    { key: "5", label: "Attraction&Tour" },
                    { key: "6", label: "Flight+Hotel" },
                    { key: "7", label: "Destination" },
                    { key: "8", label: "Rewards" }]}
                className={styles['main-menu']}></Menu>
        </div >)
    }
}

export const Header = withRouter(HeaderComponent);