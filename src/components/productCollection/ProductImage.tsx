import React from 'react';
import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

interface PropsType {

    id: number | string;
    size: "large" | "small";
    title: string;
    imageSrc: string;
    price: number | string;

}

export const ProductImage: React.FC<PropsType> = ({ id, size, title, imageSrc, price }) => {


    return (<Link to={`detail/${id}`}>
        {
            (size === "large") ?
                (<Image src={imageSrc} height={285} width={480}></Image>) :
                (<Image src={imageSrc} height={120} width={240}></Image>)
        }
        <div>
            <Typography.Text type="secondary">{(size === "large") ? (title.slice(0, 50)) : (title.slice(0, 22))}</Typography.Text>
            <Typography.Text type="danger">&nbsp;&nbsp;&nbsp;From ${price}</Typography.Text>
        </div>
    </Link>);
}


