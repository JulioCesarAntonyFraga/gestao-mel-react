import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, message, Spin, Select, Upload } from "antd";
import {PercentageOutlined, LeftCircleOutlined, MinusCircleOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import app from '../firebase';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
// import ImageField from './ImageField';

const DynamicForm = ({ campos, onSubmit, baseRoute, redirect, isReadOnly }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [disableAll, setDisableAll] = useState(false);
  const { id } = useParams();
  const { TextArea } = Input;
  const navigate = useNavigate();

  const TextList = ({ value = [], onChange }) => {
    const handleChange = (i, e) => {
      const newValue = [...value];
      newValue[i] = e.target.value;
      onChange(newValue);
    };
  
    const handleAdd = () => {
      const newValue = [...value, ''];
      onChange(newValue);
    };
  
    const handleRemove = (i) => {
      const newValue = [...value];
      newValue.splice(i, 1);
      onChange(newValue);
    };
  
    return (
      <div>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: '8px' }}
        >
          Adicionar
        </Button>
        {value.map((item, i) => (
          <div key={i} style={{ display: 'flex', marginBottom: '8px' }}>
            <Input value={item} onChange={(e) => handleChange(i, e)} style={{ marginRight: '8px' }} />
            <Button
              type="danger"
              icon={<MinusCircleOutlined />}
              onClick={() => handleRemove(i)}
            />
          </div>
        ))}
      </div>
    );
  };

  const ImageField = ({value = "", onChange}) => {
    const handleChange = async (info) => {
        setLoading(true);
        // Get base64
        const reader = new FileReader();
        const blob = info.file.slice(0, info.file.size, info.file.type);
        reader.readAsDataURL(blob);
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1];

            // Upload to storage
            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${info.file.name}_${uuidv4()}`);
            try {
                const snapshot = await uploadString(storageRef, base64, "base64");
                const downloadUrl = await getDownloadURL(snapshot.ref);
                setLoading(false);
                onChange(downloadUrl);
                console.log(downloadUrl);
            } catch (error) {
                message.error(error.message);
                setLoading(false);
            }
        };
    };

    return (
      <>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          maxCount={1}
          beforeUpload={() => false}
          onChange={(info) => handleChange(info)}
        >
          {value ? <img style={{width: '100%'}} src={value}/> : <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>}
        </Upload>
        
      </>
    );
  }

  const ImageListField = ({ value = [], onChange }) => {
    if(!value)
      value = [];

    const handleUpload = async (info) => {
      setLoading(true);
      try {
        
        const reader = new FileReader();
        const blob = info.file.slice(0, info.file.size, info.file.type);
        reader.readAsDataURL(blob);
        reader.onload = async () => {
          const base64 = reader.result.split(",")[1];
          // Upload to storage
          const storage = getStorage(app);
          const storageRef = ref(storage, `images/${info.file.name}_${uuidv4()}`);
          try{
            const snapshot = await uploadString(storageRef, base64, "base64");
            const downloadUrl = await getDownloadURL(snapshot.ref);
            console.log(value)
            const newValue = [...value, downloadUrl];
            setLoading(false);
            onChange(newValue);
          }catch(error){
            console.log(error);
            setLoading(false);
          }
          
        }
      } catch (error) {
        message.error(error.message);
        setLoading(false);
      }
      setLoading(false);
    };
  
    const handleRemove = (url) => {
      const newValue = value.filter((v) => v !== url);
      onChange(newValue);
    };
  
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        {value.map((url) => (
          <div key={url} style={{ display: "inline-block", marginRight: 8 }}>
            <img src={url} style={{ width: 100 }} />
            <div>
              <Button onClick={() => handleRemove(url)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (id) {
      if(isReadOnly)
        setDisableAll(true);
      
      api.get(`/${baseRoute}/${id}`).then((response) => {
        const data = response.data;
        console.log('Received: ', data);
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
    
    console.log('Sent: ', payload);

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
    <>
      <Button icon={<LeftCircleOutlined />} onClick={() => navigate(-1)} style={{border: 'none', background: 'none', textAlign: 'left', boxShadow: 'none', fontSize: '30px', marginBottom: '20px'}} size="large"></Button>
      <Spin spinning={loading}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
          {campos.map((campo) => {
              const { type, label, key, prefix, disabled, required, maxLength, minLength, options, placeholder, readOnly } = campo;
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
                            disableAll ? <Checkbox disabled={true} /> : <Checkbox disabled={disabled} />
                          ):
                          type === "textArea" ? (
                            disableAll ? <TextArea readOnly rows={4} /> : <TextArea disabled={disabled} rows={4} readOnly={readOnly} />
                          ):
                          type === "textList" ? (
                            <TextList />
                          ):
                          type === "image" ? (
                            <ImageField />
                          ):
                          type === "imageList" ? (
                            <ImageListField />
                          ):
                          type === "select" ? (
                            disableAll ? <Select disabled={true} options={options} placeholder={placeholder} /> : <Select disabled={disabled} options={options} placeholder={placeholder} /> 
                          ):
                          disableAll ? <Input type={type} readOnly prefix={prefixSymbol} /> : <Input type={type} disabled={disabled} prefix={prefixSymbol} readOnly={readOnly} />
                        }
                  </Form.Item>
                </Col>
              );
            })}
            <Form.Item>
              <Button type="primary" disabled={disableAll} htmlType="submit" loading={loading}>
                Enviar
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Spin>
    </>
  );
};

export default DynamicForm;
