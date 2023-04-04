import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const campos = [
  { inputType: "text", label: "Nome", key: "name", maxLength: 40, required: true, minLength: 5 },
  { inputType: "text",  tipo: "textArea", label: "Descrição", key: "description", maxLength: 250, required: false },
  { inputType: "number", tipo: "money", label: "Custo", key: "coust", prefix: "money", required: true },
  { inputType: "number", tipo: "money", label: "Preço de venda", key: "price", prefix: "money", required: true },
  { inputType: "number", label: "Estoque", key: "stock", required: true },
  { inputType: "number", tipo: "number", label: "Porcentagem De Lucro", key: "profitPercentage", prefix: "percentage", disabled: true, required: false },
  { tipo: "boolean", label: "Material", key: "isRawMaterial" },
];

const ProductForm = (props) => {
  const { id } = useParams();

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post('/products', payload);
    }
    else{
      await api.put(`/products/${id}`, payload);
    }
  };

  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} baseRoute="products" />;
};

export default ProductForm;
