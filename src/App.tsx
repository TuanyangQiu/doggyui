import React from 'react';
import styles from './App.module.css';
import { Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartner } from './components';
import { Row, Col, Typography } from 'antd';
import { popularDestinationsProudctList } from './mockups';
import SideImage1 from './assets/images/sider01.jpg';
import SideImage2 from './assets/images/sider02.jpg';
import SideImage3 from './assets/images/sider03.jpg';
import BussPartner1 from './assets/images/BussPartner_facebook.png';
import BussPartner2 from './assets/images/BussPartner_Instagram.png';
import BussPartner3 from './assets/images/BussPartner_Microsoft.png';
import BussPartner4 from './assets/images/BussPartner_Youtube.png';
function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles['page-content']} >

        <Row style={{ marginTop: 20 }} >
          <Col span={6}>
            <SideMenu />
          </Col>

          <Col span={18}>
            <Carousel />
          </Col>
        </Row>

        <ProductCollection
          title={<Typography.Title level={3} type="warning" >Popular Destinations</Typography.Title>}
          sideImage={SideImage1}
          products={popularDestinationsProudctList} />
      </div>
      <BusinessPartner title="Business Partners" imageUrlList={[BussPartner1,BussPartner3, BussPartner2, BussPartner3, BussPartner4,BussPartner1, BussPartner4,BussPartner2, BussPartner3, BussPartner4,BussPartner1]} />
      <Footer />

    </div>
  );
}

export default App;
