import React from "react";
import Styles from './ProductComment.module.css';
import { List, Comment } from "antd";

interface PropsType {

    data: {
        author: string,
        avatar: string,
        content: string,
        dateTime: string
    }[];
}

export const ProductComment: React.FC<PropsType> = ({ data }) => {


    return (
        <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={item => (
                <li>
                    <Comment style={{ marginLeft: 30, marginRight: 80 }}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.dateTime}
                    />
                </li>
            )}>

        </List>);
}