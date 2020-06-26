import React from "react";
import { Input, Form, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import api from "../Shared/api";

const Register = () => {
  const history = useHistory();

  const onFinish = async (values: any) => {
    await api.post("/register", values);
    history.push("/login");
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
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
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
              Register
            </Button>
          </Form.Item>
          Already User <Link to="/login">login here!</Link>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
