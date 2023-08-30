import React from "react";
import Styles from "./SignInForm.module.css";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {

        let response: any;
        try {
            response = await axios.post("http://localhost:5022/auth/login",
                {
                    email: values.username,
                    password: values.password
                });

            navigate("/");
        } catch (error) {

            alert("registration failed, please try again later");
        }
    };

    const onFinishFailed = (errorInfo: any) => {

    };

    return (
        <Form
            className={Styles["signIn-form"]}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}