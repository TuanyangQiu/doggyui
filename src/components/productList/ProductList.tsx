import React from "react";
import { Link } from "react-router-dom";
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Product {
  DepartureCity: string;
  Description: string;
  //discountPresent: number;
  Id: string;
  //originalPrice: number;
  Price: number;
  Rating: number;
  Title: string;
  touristRoutePictures: any[];
  TravelDays: string;
  TripType: string;
}
interface PropsType {
  data: Product[];
  paging: any;
  onPageChange?: (nextPage, pageSize) => void;
}

const listData = (productList: Product[]) =>
  productList.map((p) => ({
    id: p.Id,
    title: p.Title,
    description: p.Description,
    tags: (
      <>
        {p.DepartureCity && <Tag color="#f50">{p.DepartureCity}出发</Tag>}
        {p.TravelDays && <Tag color="#108ee9">{p.TravelDays} 天 </Tag>}
        {/* {p.discountPresent && <Tag color="#87d068">超低折扣</Tag>} */}
        {p.TripType && <Tag color="#2db7f5">{p.TripType}</Tag>}
      </>
    ),
    imgSrc: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",// p.touristRoutePictures[0].url,
    price: p.Price,
    originalPrice: 999, //p.originalPrice,
    discountPresent: 0.8, //p.discountPresent,
    rating: p.Rating,
  }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ProductList: React.FC<PropsType> = ({
  data,
  paging,
  onPageChange,
}) => {


  if (!Array.isArray(data) || data.length === 0) {
    return (<div>
      <Typography.Title level={3}>No matched Results, please try other keywords</Typography.Title>
    </div>)
  }

  const products = listData(data);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        current: paging.PageInfo.CurrentPageNum,
        onChange: (page) => onPageChange && onPageChange(page, paging.PageInfo.PageSize),
        pageSize: paging.PageInfo.PageSize,
        total: paging.PageInfo.TotalRecordCounts,
      }}
      dataSource={products}
      footer={
        <div>
          Total Products:
          <Text strong>{paging.PageInfo.TotalRecordCounts}</Text>
          {paging.PageInfo.TotalRecordCounts == 1 ? " Item" : " Items"}
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <>
              <Rate defaultValue={3} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </>,
          ]}
          extra={
            <Image width={272} height={172} alt="image" src={item.imgSrc} />
          }
        >
          <List.Item.Meta
            title={
              <>
                {item.discountPresent ? (
                  <>
                    <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                      $ {item.originalPrice}
                    </Text>
                    <Text
                      type="danger"
                      style={{ fontSize: 20, fontWeight: 400 }}
                    >
                      {" "}
                      $ {item.price}
                    </Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 20, fontWeight: 400 }}>
                    $ {item.price}
                  </Text>
                )}
                <Link to={"/detail/" + item.id}> {item.title}</Link>
              </>
            }
            description={item.tags}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};
