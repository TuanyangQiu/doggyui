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
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/store";
import {
    fetchRecommendProductsStartActionCreator,
    fetchRecommendProductsSuccessActionCreator,
    fetchRecommendProductsFailActionCreator
} from '../../redux/recommendProducts/recommendProductsActions';

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        requestError: state.recommendProducts.requestError,
        ProductsList: state.recommendProducts.ProductsList
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        startFetch: () => {
            dispatch(fetchRecommendProductsStartActionCreator());
        },
        fetchOK: (data: any) => {

            dispatch(fetchRecommendProductsSuccessActionCreator(data))
        },

        fetchNG: (error: any) => {
            dispatch(fetchRecommendProductsFailActionCreator(error));
        }


    }

}

type PropsType = WithTranslation
    & ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

    async componentDidMount() {
        try {
            this.props.startFetch();
            const resp = await axios.get("http://127.0.0.1:5022/TouristRoutes?pageNumber=1&pageSize=9");

            const tempProd = (resp.data as any[]).map((m, index) => {
                return {
                    id: index,
                    title: m.Title,
                    touristRoutePictures: [{ url: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg" }],
                    price: m.Price
                }
            });

            this.props.fetchOK(tempProd);

        } catch (error) {

            // if (error instanceof Error) 
            {
                console.log("network 1:  ", error);
                this.props.fetchNG(error);
            }
        }
    }


    render(): React.ReactNode {
        const { t, loading, requestError, ProductsList } = this.props;

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

        console.log("network2:  ", requestError);
        if (requestError) {
            return <div>Sorry, {requestError.message}</div>;
        }
        console.log("going to display ..");
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
                        products={ProductsList} />

                </div>
                <BusinessPartner title={t("home_page.business_partner")} imageUrlList={[BussPartner1, BussPartner3, BussPartner2, BussPartner3, BussPartner4, BussPartner1, BussPartner4, BussPartner2, BussPartner3, BussPartner4, BussPartner1]} />
                <Footer />

            </>)
    }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));