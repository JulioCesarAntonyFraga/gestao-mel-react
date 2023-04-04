import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, } from "antd";
import {PercentageOutlined} from "@ant-design/icons"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DynamicForm = ({ campos, onSubmit, baseRoute }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { TextArea } = Input;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      api.get(`/${baseRoute}/${id}`).then((response) => {
        form.setFieldsValue(response.data);
      });
    }
  }, [id, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    const payload = { ...values, key: campos.key };
    let isEdit = false;
    if(id)
      isEdit = true;

    onSubmit(payload, isEdit)
      .then(() => {
        form.resetFields();
      })
      .finally(() => {
        setLoading(false);
        navigate('/produtos')
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      {campos.map((campo) => {
        const { inputType, tipo, label, key, prefix, disabled, required, maxLength, minLength } = campo;
        var prefixSymbol = null;
        if(prefix){
          if(prefix === "percentage")
            prefixSymbol = <PercentageOutlined />
        }
        return (
          <Form.Item key={key} name={key} label={label} valuePropName={campo.tipo === "boolean" ? "checked" : "value"} rules={[
            { required: required, message: "Por favor, preencha o campo " + label },
            { max: maxLength, message: 'Número máximo de caracteres excedido: ' + maxLength },
            { min: minLength, message: 'Número mínimo de caracteres requerido: ' + minLength}

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
        );
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
