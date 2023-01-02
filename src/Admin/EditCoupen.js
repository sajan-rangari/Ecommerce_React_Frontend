import React, { useMemo, useState } from "react";
import { Button, Checkbox, Form, Input, Card, Avatar, Space } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const Context = React.createContext({
  name: "Default",
});
const EditCoupen = ({ editCoupen, isChange, setIsChange, token }) => {
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const formatted = formatDate(editCoupen.expiryDate);
  const coupenId = useParams();
  const [coupenName, setCoupenName] = useState(editCoupen.name);
  const [discountType, setDiscountType] = useState(editCoupen.discountType);
  const [discountValue, setDiscountValue] = useState(editCoupen.discountValue);
  const [minOrderAmount, setMinOrderAmount] = useState(
    editCoupen.minOrderAmount
  );
  const [expiryDate, setExpiryDate] = useState(formatted);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, coupenName) => {
    api.success({
      message: `Updated Coupen`,
      description: (
        <Context.Consumer>
          {(name) => `${coupenName} Coupen Updated Successfully !!`}
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

  const updateCoupen = () => {
    const coupen = {
      name: coupenName,
      discountType: discountType,
      discountValue: discountValue,
      minOrderAmount: minOrderAmount,
      expiryDate: expiryDate,
    };

    fetch(`http://localhost:3500/api/v1/coupens/${coupenId.id}`, {
      method: "PUT",
      body: JSON.stringify(coupen),
      mode: "cors",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
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
    <div className="editCoupenForm">
      <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
      <Card>
        <h3>Edit Coupen Details</h3>
        <Form
          name="normal_coupen"
          className="coupen-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="name">
            <Input
              placeholder="Name"
              defaultValue={coupenName}
              onChange={onSetName}
            />
          </Form.Item>
          <Form.Item name="discountType">
            <Input
              placeholder="Discount Type"
              defaultValue={discountType}
              onChange={onSetDiscountType}
            />
          </Form.Item>
          <Form.Item name="discountValue">
            <Input
              placeholder="Discount Value"
              defaultValue={discountValue}
              value={discountValue}
              onChange={onSetDiscountValue}
            />
          </Form.Item>
          <Form.Item name="minOrderAmount">
            <Input
              placeholder="Minimum Order Amount"
              defaultValue={minOrderAmount}
              value={minOrderAmount}
              onChange={onSetMinOrderAmount}
            />
          </Form.Item>
          <Form.Item name="expiryDate">
            <Input
              type="date"
              defaultValue={expiryDate}
              onChange={onSetExpiryDate}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => updateCoupen()}
              >
                <span style={{ marginRight: "10px" }}>Update</span>
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

export default EditCoupen;
