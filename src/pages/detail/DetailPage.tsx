import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, MenuProps, Button } from "antd";
import { ProductIntro, ProductComment } from "../../components";
import Styles from './DetailPage.module.css';
import { mockupComments, productPictures } from './mockupDetails';
import { getProductDetailAsync } from '../../redux/productDetail/slice';
import { useSelector, useAppDispatch } from '../../redux/hooks';
import { MainLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItemAsync } from "../../redux/shoppingCart/slice";
type MatchParams = {
    touristRouteId: string;
}
const { RangePicker } = DatePicker;


const menuItems: MenuProps['items'] = [
    {
        label: (<a href="#feature"> Feature</a>),
        key: '1',
    },
    {
        label: (<a href="#fees"> Fees</a>),
        key: '2',
    },
    {
        label: (<a href="#notes"> Notes</a>),
        key: '3',
    },
    {
        label: (<a href="#comments"> Comments</a>),
        key: '4',
    },
];

export const DetailPage: React.FC = () => {

    const { touristRouteId } = useParams<MatchParams>();
    const loading = useSelector((state) => state.productDetailReducer.loading);
    const productInfo = useSelector(state => state.productDetailReducer.data);
    const requestError = useSelector(state => state.productDetailReducer.requestError);
    const shoppingCartLoading = useSelector(state => state.shoppingCartReducer.loading);
    const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();// useDispatch();

    useEffect(() => {
        if (touristRouteId)
            dispatch(getProductDetailAsync(touristRouteId));
    }, []);


    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }

    if (requestError) {
        return <div>Sorry, {requestError}</div>;
    }

    return (
        <MainLayout>
            {/* Product introduction and date selection */}
            <div className={Styles["product-intro-container"]}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={productInfo.Title}
                            shortDescription={productInfo.Description}
                            price={productInfo.Price}
                            coupons={"no cupon"}
                            points={"no point"}
                            discount={"no discount"}
                            rating={productInfo.Rating}
                            pictures={productPictures} />
                        {/* pictures={productInfo.TouristRoutePictures.map(p => p.url)} /> */}
                    </Col>
                    <Col span={11} >
                        <Button
                            style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(addShoppingCartItemAsync({
                                    jwtToken: jwtToken as string,
                                    productId: touristRouteId as string
                                }))
                            }}
                        >
                            <ShoppingCartOutlined />
                            {t("productDetail.addToCart")}
                        </Button>
                        <RangePicker open style={{ marginTop: 20 }} />
                    </Col>
                </Row></div>
            {/* Anchor Menu */}
            <Anchor className={Styles["product-detail-anchor"]}>
                <Menu mode="horizontal" items={menuItems} />
            </Anchor>

            {/* Product features */}
            <div className={Styles["product-detail-container"]} id="feature">
                <Divider orientation="center">
                    <Typography.Title level={3} >Features</Typography.Title>
                </Divider>
                <Typography.Text className={Styles["product-detail-content"]} >{productInfo.Features}</Typography.Text>
            </div>

            {/* Fees instrument */}
            <div className={Styles["product-detail-container"]} id="fees">
                <Divider orientation="center">
                    <Typography.Title level={3} >Fees</Typography.Title>
                </Divider>
                <Typography.Text className={Styles["product-detail-content"]}>{productInfo.Fees}</Typography.Text>
            </div>


            {/* notes about the product */}
            <div className={Styles["product-detail-container"]} id="notes">
                <Divider orientation="center">
                    <Typography.Title level={3} >Notes</Typography.Title>
                </Divider>
                <Typography.Text className={Styles["product-detail-content"]} >{productInfo.Notes}</Typography.Text>
            </div>

            {/* comments */}
            <div className={Styles["product-detail-container"]} id="comments">
                <Divider orientation="center">
                    <Typography.Title level={3}>Comments</Typography.Title>
                </Divider>
                <ProductComment data={mockupComments} />
            </div>
        </MainLayout>
    )
}