import React, { useState, useEffect } from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const SaleForm = (props) => {
  const { id } = useParams();
  const baseRoute = 'sales'
  const [customerOptions, setCustomerOptions] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await api.get('/customers');
      const customers = response.data;

      const options = customers.map(customer => {
        return { value: customer.id, label: customer.name };
      });

      setCustomerOptions(options);
    };

    fetchCustomers();
  }, []);

  const campos = [
    { type: "text", label: "ID", key: "id", disabled: true, },
    { type: "select", label: "Cliente", key: "customerId", required: true,
      options: customerOptions, placeholder: 'Selecione Um Cliente' },
    { type: "number", label: "Custo Total", key: "totalCoust", disabled: true, required: false, prefix: 'R$' },
    { type: "number", label: "Preço Total", key: "totalCoust", disabled: true, required: false, prefix: 'R$' },
    { type: "number", label: "Desconto", key: "discountPercentage", prefix: '%', required: false},
    { type: "number", label: "Lucro", key: "profit", prefix: 'R$', required: false},
  ];

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post(`/${baseRoute}`, payload);
    }
    else{
      await api.put(`/${baseRoute}/${id}`, payload);
    }
  };

  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} readOnly={true} baseRoute={baseRoute} redirect='vendas' />;
};

export default SaleForm;
