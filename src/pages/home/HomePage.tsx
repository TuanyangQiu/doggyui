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
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { FetchRecommendProductsActionCreator } from '../../redux/recommendProducts/recommendProductsActions';
import { MainLayout } from "../../layouts";
const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        requestError: state.recommendProducts.requestError,
        ProductsList: state.recommendProducts.ProductsList
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        FetchProductData: () => { dispatch(FetchRecommendProductsActionCreator()) }
    }

}

type PropsType = WithTranslation
    & ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.FetchProductData();
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

        if (requestError) {
            return <div>Sorry, {requestError.message}</div>;
        }

        return (
            <MainLayout>

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

                <BusinessPartner title={t("home_page.business_partner")} imageUrlList={[BussPartner1, BussPartner3, BussPartner2, BussPartner3, BussPartner4, BussPartner1, BussPartner4, BussPartner2, BussPartner3, BussPartner4, BussPartner1]} />

            </MainLayout>)
    }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));