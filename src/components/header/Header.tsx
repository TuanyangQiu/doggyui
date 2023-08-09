import React from "react";
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

export const Header: React.FC = () => {
    return <div className={styles['app-header']}>
        <div className={styles['top-header']}>
            {/* <div  className={styles.inner}> */}
            <Typography.Text>Welcome</Typography.Text>
            <Dropdown.Button
                style={{ marginLeft: 15 }}
                overlay={<Menu items={[{ key: "1", label: "中文" },
                { key: "2", label: "English" }]} />}
                icon={<GlobalOutlined />}>EN/中  </Dropdown.Button>

            <Button.Group className={styles['button-group']}>
                <Button>Register</Button>
                <Button>Login</Button>
            </Button.Group>
            {/* </div> */}
        </div>
        <Layout.Header className={styles['main-header']}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title className={styles.title} level={3}>Doggy Travel</Typography.Title>
            <Input.Search className={styles['search-input']} placeholder='please input travel destination, countries, types' />
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
    </div>;
}