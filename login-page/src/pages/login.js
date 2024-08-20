import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Form values:', values);
    navigate('/test');
  };

  return (
    <div className="login-container">
      <Form
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
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
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
            prefix={<LockOutlined />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            suffix={showPassword ? <EyeInvisibleOutlined onClick={() => {setShowPassword(!showPassword)}} /> : <EyeOutlined onClick={() => {setShowPassword(!showPassword)}} />}
          />
        </Form.Item>
        <Form.Item>
          <a href="">
            Forgot password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button id="login-btn" type="primary" htmlType="submit" className="login-form-button">
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;