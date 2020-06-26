import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import api from "../Shared/api";
import { storeAuthToken } from "../Utils/authToken";

const Login = () => {
  const history = useHistory();

  const onFinish = async (values: any) => {
    const res: any = await api.post("/login", values);
    storeAuthToken(res.token);
    history.push("/tasks");
  };

  return (
    <Row className="center-content">
      <Col
        xl={{ span: 6, offset: 9 }}
        lg={{ span: 8, offset: 8 }}
        md={{ span: 8, offset: 8 }}
        sm={{ span: 16, offset: 4 }}
        xs={{ span: 20, offset: 2 }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          Or <Link to="/register">register now!</Link>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
