import React from "react";
import { Row, Col, Typography, Spin } from 'antd';
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartner } from '../../components';
import Styles from './HomePage.module.css';
import SideImage1 from '../../assets/images/sider01.jpg';
import SideImage2 from '../../assets/images/sider02.jpg';
import SideImage3 from '../../assets/images/sider03.jpg';
import BussPartner1 from '../../assets/images/BussPartner_facebook.png';
import BussPartner2 from '../../assets/images/BussPartner_Instagram.png';
import BussPartner3 from '../../assets/images/BussPartner_Microsoft.png';
import BussPartner4 from '../../assets/images/BussPartner_Youtube.png';
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";

interface State {
    productionList: any[],
    loading: boolean,
    requestTouristRoutesError: string | null
}

class HomePageComponent extends React.Component<WithTranslation, State> {

    constructor(props) {
        super(props);
        this.state = {
            productionList: [],
            loading: true,
            requestTouristRoutesError: null
        }
    }

    async componentDidMount() {
        try {
            const resp = await axios.get("http://127.0.0.1:5022/TouristRoutes?pageNumber=1&pageSize=9",
                { headers: { Accept: "application/json" } });

            const tempProd = (resp.data as any[]).map((m, index) => {
                return {
                    id: index,
                    title: m.Title,
                    touristRoutePictures: [{ url: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg" }],
                    price: m.Price
                }
            });

            this.setState({ productionList: tempProd, loading: false, requestTouristRoutesError: null });
        } catch (error) {
            if (error instanceof Error)
                this.setState({ productionList: [], loading: false, requestTouristRoutesError: error.message });
        }
    }


    render(): React.ReactNode {
        const { t } = this.props;
        const { productionList, loading, requestTouristRoutesError } = this.state;
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
        if (requestTouristRoutesError) {
            return <div>Sorry, {requestTouristRoutesError}</div>;
        }

        return (
            <>
                <Header />
                <div className={Styles['page-content']} >

                    <Row style={{ marginTop: 20 }} >
                        <Col span={6}>
                            <SideMenu />
                        </Col>

                        <Col span={18}>
                            <Carousel />
                        </Col>
                    </Row>

                    <ProductCollection
                        title={<Typography.Title level={3} type="warning" >{t("home_page.most_popular_dest")}</Typography.Title>}
                        sideImage={SideImage1}
                        products={productionList} />

                </div>
                <BusinessPartner title={t("home_page.business_partner")} imageUrlList={[BussPartner1, BussPartner3, BussPartner2, BussPartner3, BussPartner4, BussPartner1, BussPartner4, BussPartner2, BussPartner3, BussPartner4, BussPartner1]} />
                <Footer />

            </>)
    }
}

export const HomePage = withTranslation()(HomePageComponent);