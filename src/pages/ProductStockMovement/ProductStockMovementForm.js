import React, { useState, useEffect } from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const ProductStockMovementForm = (props) => {
  const { id } = useParams();
  const baseRoute = 'ProductStockMovements'
  const [productOptions, setProductOptions] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if(id)
      setIsReadOnly(true);

    const fetchCustomers = async () => {
      const response = await api.get('/products');
      const products = response.data;

      const options = products
          .map(product => {
            return { value: product.id, label: product.name };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
          
      setProductOptions(options);
    };

    fetchCustomers();
  }, []);

  const campos = [
    { type: "text", label: "ID", key: "id", disabled: true, readOnly: isReadOnly },
    { type: "select", label: "Produto", key: "productId", required: true, options: productOptions, placeholder: 'Selecione Um Produto', readOnly: isReadOnly },
    { type: "select", label: "Tipo De Movimentação", key: "type", required: true, options: [
      { value: 0, label: 'Adição' },
      { value: 1, label: 'Subtração' },
    ], placeholder: 'Selecione Um Tipo', readOnly: isReadOnly },
    { type: "number", label: "Quantidade", key: "amount", required: true, readOnly: isReadOnly },
  ];

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post(`/${baseRoute}`, payload);
    }
    else{
      await api.put(`/${baseRoute}/${id}`, payload);
    }
  };

  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} baseRoute={baseRoute} redirect='estoque' isReadOnly={isReadOnly} />;
};

export default ProductStockMovementForm;
