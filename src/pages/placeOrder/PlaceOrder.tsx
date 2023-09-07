import React, { useEffect } from "react";
import Styles from "./PlaceOrder.module.css";
import { PaymentForm, CheckOutCard, MockBankCardsList } from "../../components";
import { MainLayout } from "../../layouts";
import { Row, Col,Typography } from "antd";
import { GetPendingOrdersAsync, ordersSlice, payOrderAsync } from "../../redux/order/slice";
import { useAppDispatch, useSelector } from "../../redux/hooks";
export const PlaceOrder: React.FC = () => {
    const orderLoading = useSelector(state => state.orderReducer.loading);
    const pendingOrders = useSelector(state => state.orderReducer.items);
    const jwtToken = useSelector(state => state.userSignInReducer.jwtToken) as string;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GetPendingOrdersAsync(jwtToken));
        // console.log("pendingOrders", pendingOrders);
    }, []);

    return (
        <MainLayout>


            {
                (Array.isArray(pendingOrders) && pendingOrders.length > 0) ? (<Row>
                    <Col span={12} >
                        <MockBankCardsList />
                        {/* <PaymentForm /> */}
                    </Col>

                    <Col span={12}>
                        {Array.isArray(pendingOrders) && pendingOrders.length > 0 &&
                            <CheckOutCard
                                loading={orderLoading}
                                order={pendingOrders}
                            />
                        }
                    </Col>

                </Row>) : (<Typography.Title level={3}>Thank you, All orders have been paid </Typography.Title>)
            }

        </MainLayout>);
}