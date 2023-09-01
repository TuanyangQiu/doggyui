import React, { useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { Card } from "antd";
import styles from "./PaymentForm.module.css";
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space, Button } from 'antd';

export const PaymentForm = () => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  return (
    <Card
      title="信用卡"
      bordered={false}
      className={styles["payment-credit-card"]}
    >
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input {...getCardNumberProps()} />
        <input {...getExpiryDateProps()} />
        <input {...getCVCProps()} />
      </PaymentInputsWrapper>
    </Card>
  );
};


export const MockBankCardsList: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Card title="Your saved payment method"
      extra={<Button>Add New Card</Button>}
      className={styles["payment-credit-card"]}>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>ANZ 428 *** *** ** 932</Radio>
          <Radio value={2}>BNZ 592 *** *** ** 907</Radio>
          <Radio value={3}>TSB 437 *** *** ** 008</Radio>
        </Space>
      </Radio.Group>
 
    </Card>);
}