import React from "react";
import { Skeleton, Card, Button, Typography, Table, Result } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
  {
    title: "产品",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "价格",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  order: any;
  onCheckout: () => void;
}

export const CheckOutCard: React.FC<PropsType> = ({
  loading,
  order,
  onCheckout,
}) => {
  const navigate = useNavigate();

  // console.log("order.orderItems", Array.isArray(order.orderItems) && order.orderItems.length > 0);
  const paymentData: OrderItem[] = Array.isArray(order.orderItems)
    ? order.orderItems.map((i, index) => ({
      key: index,
      item: i.title,
      amount: (
        <>
          <Text delete>¥ {i.originalPrice} </Text>{" "}
          <Text type="danger" strong>
            ¥ {i.originalPrice * i.discountPercent}
          </Text>
        </>
      ),
    }))
    : [];

  return (
    <Card
      style={{ width: 600, marginTop: 50 }}
      actions={[
        order && order.orderStatus === "Completed" ? (
          <Result
            status="success"
            title="Successfully Placed Orders!"
            subTitle="Order number: 2017182818828182881"
            extra={[
              <Button type="primary" key="console"
                onClick={() => {
                  navigate("/");
                }}>
                Go Home Page
              </Button>,
              // <Button key="buy">Buy Again</Button>,
            ]}
          />
          // <Button
          //   type="primary"
          //   onClick={() => {
          //     navigate("/");
          //   }}
          //   loading={loading}
          // >
          //   <HomeOutlined />
          //   Return To Home Page
          // </Button>
        ) : (
          <Button type="primary" danger onClick={onCheckout} loading={loading}>
            <CheckCircleOutlined />
            Place Order
          </Button>
        ),
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={
            <Title level={2}>
              {order && order.state === "Completed" ? "Paid Successfully" : "Total"}
            </Title>
          }
          description={
            <Table<OrderItem>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
  );
};
