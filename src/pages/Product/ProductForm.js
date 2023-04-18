import React, { useEffect, useState } from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const ProductForm = (props) => {
  const { id } = useParams();
  const [stockReadOnly, setStockReadOnly] = useState(false);
  const baseRoute = 'products';

  useEffect(() => {
    if(id)
      setStockReadOnly(true);
  }, [])

  const campos = [
    { type: "text", label: "ID", key: "id", disabled: true, },
    { type: "text", label: "Nome", key: "name", maxLength: 40, required: true, minLength: 5 }, 
    { type: "number", label: "Custo", key: "coust", prefix: "R$", required: true },
    { type: "number", label: "Preço de venda", key: "price", prefix: "R$", required: true },
    { type: "number", label: "Estoque", key: "stock", required: true, disabled: stockReadOnly  },
    { type: "number", label: "Porcentagem De Lucro", key: "profitPercentage", prefix: "percentage", disabled: true, required: false },
    { type: "boolean", label: "Material", key: "isRawMaterial" },
    { type: "textArea", label: "Descrição", key: "description", maxLength: 250, required: false },
  ];

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post(`/${baseRoute}`, payload);
    }
    else{
      await api.put(`/${baseRoute}/${id}`, payload);
    }
  };

  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} baseRoute={baseRoute} redirect='produtos' />;
};

export default ProductForm;
