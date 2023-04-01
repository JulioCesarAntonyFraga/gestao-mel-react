import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated)
      navigate('/');
  });

  const handleLogin = async () => {
    setIsLoading(true);
    await login(email, password);
    // setIsLoading(false);
    navigate("/");
  };

  return (
    <Card title="Login" style={{ maxWidth: "400px", margin: "auto" }}>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Por favor, informe o usuário" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, informe a senha" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: "100%" }}
          >
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default Login;
