import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message, Spin, Select } from "antd";
import {PercentageOutlined} from "@ant-design/icons"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
// import moment from "moment";
// import 'moment/locale/pt-br';

const DynamicForm = ({ campos, onSubmit, baseRoute, redirect }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { TextArea } = Input;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      api.get(`/${baseRoute}/${id}`).then((response) => {
        const data = response.data;
        const updatedFields = {};
        campos.forEach((campo) => {
          const { key, type, options } = campo;
          if (type === "select") {
            const value = data[key];
            const option = options.find((opt) => opt.value === value);
            updatedFields[key] = option ? option.value : undefined;
          } else {
            updatedFields[key] = data[key];
          }
        });
        form.setFieldsValue(updatedFields);
      });
    }
    setLoading(false);
  }, [id, form, campos]);


  const handleSubmit = (values) => {
    setLoading(true);
    const payload = { ...values, key: campos.key };
    let isEdit = false;
    if(id)
      isEdit = true;

    onSubmit(payload, isEdit)
      .then(() => {
        form.resetFields();
        setLoading(false);
        message.success('Enviado com sucesso');
        navigate('/' + redirect);
      })
      .catch(() => {
        message.error('Não foi possível enviar o formulário');
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
        {campos.map((campo) => {
            const { type, label, key, prefix, disabled, required, maxLength, minLength, options, placeholder } = campo;
            var prefixSymbol = null;
            if(prefix){
              if(prefix === "percentage")
                prefixSymbol = <PercentageOutlined />
              else
                prefixSymbol = prefix;
            }
            return (
              <Col xs={24} md={12} key={campo.key}>
                <Form.Item key={key} name={key} label={label} valuePropName={type === "boolean" ? "checked" : "value"} rules={[
                  required ? { required: required, message: "Por favor, preencha o campo " + label } : null,
                  maxLength ? { max: maxLength, message: 'Número máximo de caracteres excedido: ' + maxLength } : null,
                  minLength ? { min: minLength, message: 'Número mínimo de caracteres requerido: ' + minLength} : null,
                  ]}>
                    
                      {
                        type === "boolean" ? (
                          <Checkbox />
                        ):
                        type === "textArea" ? (
                          <TextArea disabled={disabled} rows={4} />
                        ):
                        type === "select" ? (
                          <Select disabled={disabled} options={options} placeholder={placeholder} />
                        ):
                        <Input type={type} disabled={disabled} prefix={prefixSymbol} />
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
    </Spin>
  );
};

export default DynamicForm;
