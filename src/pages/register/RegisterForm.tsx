import React from "react";
import Styles from "./RegisterForm.module.css";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        let response:any;
        try {
             response = await axios.post("http://localhost:5022/auth/Register",
                {
                    Email: values.username,
                    Password: values.password,
                    ConfirmPassword: values.confirmPassword
                });
            
            navigate("/signin");
        } catch (error) {
            
            alert("registration failed, please try again later");
        }
        console.log("register response", response);
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <Form className={Styles["register-form"]}
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

            <Form.Item
                // hasFeedback
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    { required: true, message: 'Please input the confirm password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    })
                ]}
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
};