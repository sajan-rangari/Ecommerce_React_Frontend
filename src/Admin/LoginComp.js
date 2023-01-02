import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const LoginComp = ({ setUser, setIsLogin, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    var user = {
      email: email,
      passwordHash: password,
    };
    setUser(user);
    fetch("http://localhost:3500/api/v1/admins/login", {
      method: "POST",
      body: JSON.stringify(user),
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsondata) => {
        setIsLogin(false);
        console.log(jsondata);
        setToken(jsondata.token);
        setUser(jsondata);

        navigate("/coupen-list");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="login">
      <Card>
        <div className="avtarImg">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required !!.",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={email}
              onChange={onSetEmail}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required !!.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              value={password}
              onChange={onSetPassword}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot">Forgot password</a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => onSubmit()}
            >
              <span style={{ marginRight: "10px" }}>Log In</span>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Button>
            <Link to="/">
              <Button style={{ marginLeft: "10px" }} type="primary" danger>
                Back to Products
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginComp;
