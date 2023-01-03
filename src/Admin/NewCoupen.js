import React, { useState, useMemo } from "react";
import { Button, Form, Input, Card, Avatar, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const Context = React.createContext({
  name: "Default",
});
const NewCoupen = ({ setIsChange, isChange, token, url }) => {
  const [coupenName, setCoupenName] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [minOrderAmount, setMinOrderAmount] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, coupenName) => {
    api.success({
      message: `Created Coupen`,
      description: (
        <Context.Consumer>
          {(name) => `${coupenName} Coupen Created Successfully !!`}
        </Context.Consumer>
      ),
      placement,
      duration: 2,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "",
    }),
    []
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onSetName = (e) => {
    setCoupenName(e.target.value);
  };
  const onSetDiscountType = (e) => {
    setDiscountType(e.target.value);
  };
  const onSetDiscountValue = (e) => {
    setDiscountValue(e.target.value);
  };
  const onSetMinOrderAmount = (e) => {
    setMinOrderAmount(e.target.value);
  };
  const onSetExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const createCoupen = () => {
    var coupen = {
      name: coupenName,
      discountType: discountType,
      discountValue: discountValue,
      minOrderAmount: minOrderAmount,
      expiryDate: expiryDate,
      createdAt: Date.now(),
    };
    fetch(`${url}/api/v1/coupens`, {
      method: "POST",
      body: JSON.stringify(coupen),
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((jsondata) => {
        console.log(jsondata);
        openNotification("topRight", jsondata.name);
        setIsChange(!isChange);
        setTimeout(() => {
          navigate("/coupen-list");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="coupenForm">
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
      <Card>
        <h3>Add Coupen Details</h3>
        <Form
          name="normal_coupen"
          className="coupen-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required !!.",
              },
            ]}
          >
            <Input placeholder="Name" value={coupenName} onChange={onSetName} />
          </Form.Item>
          <Form.Item
            name="discountType"
            rules={[
              {
                required: true,
                message: "Discount type is required !!.",
              },
            ]}
          >
            <Input
              placeholder="Discount Type"
              value={discountType}
              onChange={onSetDiscountType}
            />
          </Form.Item>
          <Form.Item
            name="discountValue"
            rules={[
              {
                required: true,
                message: "Discount Value is required !!.",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Discount Value"
              value={discountValue}
              onChange={onSetDiscountValue}
            />
          </Form.Item>
          <Form.Item
            name="minOrderAmount"
            rules={[
              {
                required: true,
                message: "Minimum Order Amount is required !!.",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Minimum Order Amount"
              value={minOrderAmount}
              onChange={onSetMinOrderAmount}
            />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            rules={[
              {
                required: true,
                message: "Expiry Date is required !!.",
              },
            ]}
          >
            <Input type="date" value={expiryDate} onChange={onSetExpiryDate} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => createCoupen()}
              >
                <span style={{ marginRight: "10px" }}>Create</span>
              </Button>
              <Link to="/coupen-list">
                <Button type="primary">Back to Coupen List</Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewCoupen;
