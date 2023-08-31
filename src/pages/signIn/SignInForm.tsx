import React from "react";
import Styles from "./SignInForm.module.css";
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserSignInSlice, UserSignInRequestAsync } from "../../redux/userSignIn/slice";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { useEffect } from "react";
export const SignInForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useSelector(state => state.userSignInReducer.loading);
    const requestError = useSelector(state => state.userSignInReducer.requestError);
    const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);
    const onFinish = async (values: any) => {

        dispatch(UserSignInRequestAsync({ userName: values.username, password: values.password }));
    };

    const onFinishFailed = (errorInfo: any) => {

    };

    useEffect(() => {
        if (requestError)
            alert("sorry unable to sign in at the moment");
        else if (jwtToken!==null)
            navigate("/");
    }, [requestError, jwtToken]);

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
                    Sign In
                </Button>
            </Form.Item>
        </Form>
    );
}