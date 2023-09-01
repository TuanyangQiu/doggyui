import React from "react";
import { Link } from "react-router-dom";
import { List, Rate, Space, Image, Tag, Typography } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
const { Text } = Typography;

interface Product {
  touristRouteId: string;
  departureCity: number;
  Description: string;
  id: string;
  originalPrice: number;
  discountPercent: number;
  // Price: number;
  rating: number;
  title: string;
  touristRoutePictures: any[];
  travelDays: string;
  tripType: number;
}
interface PropsType {
  data: Product[];
  onPageChange?: (nextPage, pageSize) => void;
}

const genRandonNumber = (): number => {
  const min = 1;
  const max = 1000;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ShoppingCartItems: React.FC<PropsType> = ({
  data,
  onPageChange,
}) => {
  const { t } = useTranslation();

  if (!Array.isArray(data) || data.length === 0) {
    return (<div>
      <Typography.Title level={3}>No item in your shopping cart</Typography.Title>
    </div>)
  }


  const listData = (productList: Product[]) =>
    productList.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.Description,
      touristRouteId: p.touristRouteId,
      tags: (
        <>
          {p.departureCity && <Tag color="#f50">{t(`departureCity.departureCity_${p.departureCity}`)} Departure</Tag>}
          {p.travelDays && <Tag color="#108ee9">{p.travelDays} Days </Tag>}
          {p.discountPercent && <Tag color="#87d068">Super value discount</Tag>}
          {p.tripType && <Tag color="#2db7f5">{t(`tripType.tripType_${p.tripType}`)}</Tag>}
        </>
      ),
      imgSrc: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg",// p.touristRoutePictures[0].url,
      price: p.originalPrice * p.discountPercent,
      originalPrice: p.originalPrice,
      discountPercent: p.discountPercent,
      rating: p.rating,
    }))


  const products = listData(data);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={products}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={StarOutlined}
              text={genRandonNumber()}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text={genRandonNumber()}
              key="list-vertical-like-o"
            />,
            <>
              <Rate defaultValue={item.rating} />
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
                {item.discountPercent ? (
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
                <Link to={"/detail/" + item.touristRouteId}> {item.title}</Link>
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
