import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, MenuProps } from "antd";
import { Header, Footer, ProductIntro, ProductComment } from "../../components";
import Styles from './DetailPage.module.css';
import { mockupComments, productPictures } from './mockupDetails';
import { productDetailSlice } from '../../redux/productDetail/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
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
    // const [loading, setLoading] = useState<boolean>(true);
    // const [productInfo, setProductInfo] = useState<any>(null);
    // const [requestError, setRequestError] = useState<string | null>(null);
    const loading = useSelector((state) => state.productDetailReducer.loading);
    const productInfo = useSelector(state => state.productDetailReducer.data);
    const requestError = useSelector(state => state.productDetailReducer.requestError);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductDetails = async () => {
            dispatch(productDetailSlice.actions.fetchStart());
            //setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5022/TouristRoutes/${touristRouteId}`);
                dispatch(productDetailSlice.actions.fetchSuccess(data));
                //setProductInfo(data);
            } catch (error) {
                dispatch(productDetailSlice.actions.fetchFail(error instanceof Error ? error.message : "unknown error!"));
                //setRequestError(error instanceof Error ? error.message : "error!");
            }
            // setLoading(false);
        }

        fetchProductDetails();

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
        <>
            <Header />
            <div className={Styles["page-content"]}>

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
                        <Col span={11}>
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
            </div>
            <Footer />
        </>
    )
}