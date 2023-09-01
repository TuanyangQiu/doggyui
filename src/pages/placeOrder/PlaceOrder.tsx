import React, { useEffect } from "react";
import Styles from "./PlaceOrder.module.css";
import { PaymentForm, CheckOutCard, MockBankCardsList } from "../../components";
import { MainLayout } from "../../layouts";
import { Row, Col } from "antd";
import { GetPendingOrdersAsync, ordersSlice } from "../../redux/order/slice";
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
            <Row>
                <Col span={12} >
                    <MockBankCardsList />
                    {/* <PaymentForm /> */}
                </Col>

                <Col span={12}>
                    {pendingOrders !== null &&
                        <CheckOutCard
                            loading={orderLoading}
                            order={pendingOrders}
                            onCheckout={() => { dispatch(ordersSlice.actions.payMoney()) }} />
                    }
                </Col>
                
            </Row>
        </MainLayout>);
}