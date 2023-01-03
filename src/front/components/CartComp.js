import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const CartComp = ({ coupens, cart, setCart, setTotalItems }) => {
  const [total, setTotal] = useState(0);
  const [appliedCoupen, setAppliedCoupen] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [originalTotal, setOriginalTotal] = useState(0);
  var totalPrice = 0;
  var cartData = [];
  var color = "";

  useEffect(() => {
    console.log("component rendered");
    calculateTotal();
    // setProducts(cart);
  }, [cart.length]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
      render: (discountType) => {
        discountType == "Percentage" ? (color = "volcano") : (color = "green");
        return <Tag color={color}>{discountType}</Tag>;
      },
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Min Order Amount",
      key: "minOrderAmount",
      dataIndex: "minOrderAmount",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => onApplyCoupen(record)}>
          <span style={{ marginRight: "5px" }}> Apply Coupen</span>
          <FontAwesomeIcon icon={faCheckSquare} />
        </Button>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onApplyCoupen = (coupen) => {
    setOriginalTotal(total);
    if (total < coupen.minOrderAmount) {
      alert("Total price is less than Min Order Amount !!.");
    } else {
      if (coupen.discountType == "Amount") {
        totalPrice = total - coupen.discountValue;
        setTotal(totalPrice);
      } else {
        totalPrice = total - total * (coupen.discountValue / 100);
        setTotal(totalPrice);
      }
      setAppliedCoupen(coupen);
      setDisabled(false);
    }

    handleCancel();
  };

  const onRemoveCoupen = () => {
    if (appliedCoupen.discountType == "Amount") {
      totalPrice = total + parseInt(appliedCoupen.discountValue);
    } else {
      totalPrice =
        total + originalTotal * (parseInt(appliedCoupen.discountValue) / 100);
    }
    setTotal(totalPrice);
    setAppliedCoupen({});
    setDisabled(true);
  };

  const deleteCartItem = (item) => {
    console.log(item);
    cart.map((product, index) => {
      if (product.id == item.id) {
        if (product.quantity > 1) {
          console.log("reached");
          product.quantity -= 1;
          product.total -= product.price;
        } else {
          cart.splice(index, 1);
        }
      }
    });
    // setProducts(cart);
    cartData = cart;
    setCart(cartData);
    console.log(cartData);
    setTotalItems(cartData.length);
    calculateTotal();
  };

  const calculateTotal = () => {
    var totalPrice = 0;
    cart.map((product) => {
      totalPrice += product.total;
    });
    setTotal(totalPrice);
  };

  const emptyCart = () => {
    setCart([]);
    setTotalItems(0);
  };

  return (
    <div className="cart">
      {cart.length > 0 && (
        <div>
          <div className="container">
            <div className="card-table">
              <div className="cart-product">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          <img
                            style={{ width: "120px" }}
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td style={{ width: "25%" }}>{item.description}</td>
                        <th style={{ width: "12%" }}>{item.price}</th>
                        <td style={{ width: "12%" }}>{item.quantity}</td>

                        <td style={{ width: "12%" }}>
                          {item.total.toFixed(2)}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            disabled={!disabled}
                            onClick={() => deleteCartItem(item)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <h6 id="HeadC">Applied Coupen</h6>
                    <h6 id="NameC">Coupen Name: {appliedCoupen.name}</h6>
                    <h6 id="DisC">
                      Discount Price:
                      {appliedCoupen.discountType == "Percentage"
                        ? total * (appliedCoupen.discountValue / 100)
                        : appliedCoupen.discountValue}
                    </h6>
                  </div>

                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => emptyCart()}
                    >
                      Empty Cart
                    </button>
                  </div>

                  <div>
                    <Link
                      to="/"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "17px",
                      }}
                    >
                      <button className="btn btn-primary">Shop More</button>
                    </Link>
                  </div>

                  <div>
                    <button
                      disabled={!disabled}
                      className="btn btn-success"
                      onClick={showModal}
                    >
                      Apply Coupen
                    </button>
                  </div>

                  <div>
                    <button
                      className="btn btn-danger"
                      disabled={disabled}
                      onClick={() => onRemoveCoupen()}
                    >
                      Remove Coupen
                    </button>
                  </div>

                  <strong>Grand Total : {total.toFixed(2)}</strong>
                </div>
                <div className="col-12" id="msg">
                  {!disabled && (
                    <p style={{ color: "gray" }}>
                      You cannot able to delete product after applying coupen.If
                      you want to delete product then please remove coupen and
                      then delete.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cart.length == 0 && (
        <div>
          <div className="container">
            <div className="card">
              <h5 className="card-title">My Cart</h5>
            </div>
            <div className="center">
              <img
                src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt=""
              />
              <h4>Your cart is empty!</h4>
              <h6>Add item to it now</h6>
              <button className="btn btn-primary">
                <Link
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "17px",
                  }}
                >
                  Shop More
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="All Coupens"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={coupens}
          pagination={{ defaultPageSize: 5 }}
        />
        {/* <div className="admin-page">
          <div className="card">
            <div>
              <div>
                <table className="styled-table" id="coupensTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>DisType</th>
                      <th>DisValue</th>
                      <th>MinOrder</th>
                      <th>ExpiryDate</th>
                      <th>Apply Coupen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupens.map((coupen) => (
                      <tr key={coupen.id}>
                        <td>{coupen.name}</td>
                        <td>{coupen.discountType}</td>
                        <td>{coupen.discountValue}</td>
                        <td>{coupen.minOrderAmount}</td>
                        <td>{coupen.expiryDate}</td>

                        <td>
                          <button className="btn btn-success">
                            Apply Coupen
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
      </Modal>
    </div>
  );
};

export default CartComp;
