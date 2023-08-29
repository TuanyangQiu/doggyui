import React from "react";
import Styles from './ProductIntro.module.css';
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from 'antd/es/table';
interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}

const columns: ColumnsType<RowType> = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120
    },
    {
        title: "description",
        dataIndex: "description",
        key: "description",
        align: "center"
    }
]

interface RowType {
    title: string,
    description: string | JSX.Element | number,
    key: number
}

export const ProductIntro: React.FC<PropsType> = ({
    title, shortDescription, price, coupons, points, discount, rating, pictures }) => {
    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: "Route",
            description: title,
        },
        {
            key: 1,
            title: "Price",
            description: (
                <>
                    ${" "}
                    <Typography.Text type="danger" strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: "Discount",
            description: discount ? (
                <>
                    ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ¥ {discount}
                    </Typography.Text>
                </>
            ) : (
                "No Discount"
            ),
        },
        {
            key: 3,
            title: "Get Coupon",
            description: coupons ? discount : "No available coupon",
        },
        {
            key: 4,
            title: "Rating",
            description: (
                <>
                    <Rate allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating} 
                    </Typography.Text>
                </>
            ),
        },
    ];
    return (
        <div className={Styles["intro-container"]}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Text>{shortDescription}</Typography.Text>
            <div className={Styles["intro-detail-content"]}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    Start from
                    <span className={Styles["intro-detail-strong-text"]}>{price}</span>
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 50 }}> 
                     Rating
                    <span className={Styles["intro-detail-strong-text"]}>{rating}</span>
                </Typography.Text>
            </div>
            <Carousel autoplay slidesToShow={3}>
                {
                    pictures.map((p ,index)=> <Image key={index} src={p} height={150}></Image>)
                }

            </Carousel>

            <Table<RowType> columns={columns} dataSource={tableDataSource}
                size="small" bordered={false} pagination={false} />
        </div>)

}