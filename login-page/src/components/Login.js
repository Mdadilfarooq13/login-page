import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [ showPassword, setShowPassword ] = useState(false);

  return (
    <div className="container">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item name="heading">
        <h2>LOGIN</h2>
        <hr />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          suffix={showPassword ? <EyeInvisibleOutlined onClick={() => {setShowPassword(!showPassword)}} /> : <EyeOutlined onClick={() => {setShowPassword(!showPassword)}} />}
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          LOGIN
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;