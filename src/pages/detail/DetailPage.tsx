import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Spin, Row, Col, DatePicker, Space } from "antd";
import { Header, Footer } from "../../components";
import Styles from './DetailPage.module.css';
type MatchParams = {
    touristRouteId: string;
}
const { RangePicker } = DatePicker;

export const DetailPage: React.FC = () => {

    const { touristRouteId } = useParams<MatchParams>();
    const [loading, setLoading] = useState<boolean>(true);
    const [productInfo, setProductInfo] = useState<any>(null);
    const [requestError, setRequestError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5022/TouristRoutes/${touristRouteId}`);

                setProductInfo(data);
            } catch (error) {
                setRequestError(error instanceof Error ? error.message : "error!");
            }
            setLoading(false);

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
                <div className={Styles["product-intro-container"]}></div>
                <Row>
                    <Col span={13}></Col>
                    <Col span={11}>
                        <RangePicker style={{ marginTop: 20 }} />
                    </Col>
                </Row>
                {/* Anchor Menu */}
                <div className={Styles["product-detail-anchor"]}></div>

                {/* Product features */}
                <div className={Styles["product-detail-container"]} id="feature"></div>

                {/* Fees instrument */}
                <div className={Styles["product-detail-container"]} id="fees"></div>

                {/* notes about the product */}
                <div className={Styles["product-detail-container"]} id="notes"></div>

                {/* comments */}
                <div className={Styles["product-detail-container"]} id="comments"></div>
            </div>
            <Footer />
        </>
    )
}