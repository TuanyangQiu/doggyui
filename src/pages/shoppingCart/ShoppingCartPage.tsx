import React from "react";
import Styles from "./ShoppingCartPage.module.css";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { ProductList, PaymentCard, ShoppingCartItems } from "../../components";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { shoppingCartSlice, checkoutShoppingCartItemAsync } from "../../redux/shoppingCart/slice";
import { useNavigate } from "react-router-dom";
export const ShoppingCartPage: React.FC = () => {
    const shoppingCartLoading = useSelector(state => state.shoppingCartReducer.loading);
    const shoppingCartItems = useSelector(state => state.shoppingCartReducer.items);
    const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // console.log("shoppingCartItems", jwtToken);
    return (
        <MainLayout>
            <Row>
                {/* All products in the shopping cart */}
                <Col span={16} >
                    <div className={Styles["product-list-container"]}>
                        <ShoppingCartItems data={shoppingCartItems}  ></ShoppingCartItems>
                    </div>
                </Col>

                {/* Total amount and payment */}
                <Col span={8} >
                    <Affix>
                        <div className={Styles["payment-card-container"]}>
                            <PaymentCard
                                loading={shoppingCartLoading}
                                originalPrice={Array.isArray(shoppingCartItems) ? shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0) : 0}
                                price={Array.isArray(shoppingCartItems) ? shoppingCartItems
                                    .map((s) =>
                                        s.originalPrice *
                                        (s.discountPercent ? s.discountPercent : 1))
                                    .reduce((a, b) => a + b, 0) : 0}
                                onShoppingCartClear={() => { }}
                                onCheckout={() => {
                                    if (Array.isArray(shoppingCartItems) && shoppingCartItems.length > 0) {
                                        dispatch(checkoutShoppingCartItemAsync(jwtToken as string));
                                        navigate("/placeOrder");
                                    }

                                }} />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
}