import React from "react";
import Styles from './BusinessPartner.module.css';
import { Divider, Image, Row, Col, Typography } from "antd";
interface PropsType {
    title: string;
    imageUrlList: string[];
}

export const BusinessPartner: React.FC<PropsType> = ({ title, imageUrlList }) => {

    return (
        <div className={Styles.content}>
            <Divider orientation="left" orientationMargin={0}>
                <Typography.Title level={3} >{title}</Typography.Title>
            </Divider>

            <Row>
                {
                    imageUrlList.map((m, index) => (
                        <Col key={index} span={6}>
                            <img src={m} alt={"BusinessParner" + index} style={{ width: "50%" }} />
                        </Col>
                    ))
                }
            </Row>

        </div>
    );
}