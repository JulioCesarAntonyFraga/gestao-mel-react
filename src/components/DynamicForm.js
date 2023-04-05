import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import {PercentageOutlined} from "@ant-design/icons"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DynamicForm = ({ campos, onSubmit, baseRoute, redirect }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const successMessage = (text) => {
    messageApi.open({
        type: 'success',
        content: text,
    });
  };

  const errorMessage = (text) => {
      messageApi.open({
          type: 'error',
          content: text,
      });
  };

  React.useEffect(() => {
    if (id) {
      api.get(`/${baseRoute}/${id}`).then((response) => {
        form.setFieldsValue(response.data);
      });
    }
  }, [id, form]);

  const handleSubmit = (values) => {
    debugger;
    setLoading(true);
    const payload = { ...values, key: campos.key };
    let isEdit = false;
    if(id)
      isEdit = true;
    try{
      onSubmit(payload, isEdit)
        .then(() => {
          form.resetFields();
        })
        .finally(() => {
          setLoading(false);
          successMessage('Enviado com sucesso');
          navigate('/' + redirect);
        });
    }
    catch{
      errorMessage('Não foi possível enviar')
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      {contextHolder}
      <Row gutter={[16, 16]}>
        {campos.map((campo) => {
          const { inputType, tipo, label, key, prefix, disabled, required, maxLength, minLength } = campo;
          var prefixSymbol = null;
          if(prefix){
            if(prefix === "percentage")
              prefixSymbol = <PercentageOutlined />
          }
          return (
            <Col xs={24} md={12} key={campo.key}>
              <Form.Item key={key} name={key} label={label} valuePropName={campo.tipo === "boolean" ? "checked" : "value"} rules={[
                required ? { required: required, message: "Por favor, preencha o campo " + label } : null,
                maxLength ? { max: maxLength, message: 'Número máximo de caracteres excedido: ' + maxLength } : null,
                minLength ? { min: minLength, message: 'Número mínimo de caracteres requerido: ' + minLength} : null,
                ]}>
                  
                    {
                      tipo === "boolean" ? (
                        <Checkbox />
                      ):
                      tipo === "money" ? (
                        <Input type="number" disabled={disabled} prefix="R$" required={required} />
                      ):
                      tipo === "textArea" ? (
                        <TextArea disabled={disabled} rows={4} />
                      ):
                      <Input type={inputType} disabled={disabled} prefix={prefixSymbol} maxLength={maxLength} minLength={minLength} />
                    }
              </Form.Item>
            </Col>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Enviar
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default DynamicForm;
