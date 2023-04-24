import React, { useState, useEffect } from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const ApointmentForm = (props) => {
  const { id } = useParams();
  const baseRoute = 'apointments'
  const [customerOptions, setCustomerOptions] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await api.get('/customers');
      const customers = response.data;

      const options = customers
        .map(customer => {
          return { value: customer.id, label: customer.name };
        })
        .sort((a, b) => a.label.localeCompare(b.label));
        
      setCustomerOptions(options);
    };

    fetchCustomers();
  }, []);

  const campos = [
    { type: "text", label: "ID", key: "id", disabled: true, },
    { type: "select", label: "Cliente", key: "customerId", required: true,
      options: customerOptions, placeholder: 'Selecione Um Cliente' },
    { type: "select", label: "Método De Pagamento", key: "paymentMethod", required: false,
    options: [
      {value: 0, label: 'PIX'},
      {value: 1, label: 'Cartão'},
      {value: 2, label: 'Dinheiro'}
    ], placeholder: 'Selecione Um Método' },
    { type: "select", label: "Tipo De Atendimento", key: "apointmentType", required: true,
    options: [
      {value: 0, label: 'Manicure ou Pedicure'},
      {value: 1, label: 'Pé + Mão'},
      {value: 2, label: 'Spa dos pés'},
      {value: 3, label: 'Esmaltação Semi Permanente'},
      {value: 4, label: 'Banho De Gel'},
      {value: 5, label: 'Manutenção Banho De Gel'},
      {value: 6, label: 'Alongamento de fibra'},
      {value: 7, label: 'Manutenção Alongamento de fibra'},
      {value: 8, label: 'Postiças'},

    ], placeholder: 'Selecione Um Tipo' },
    { type: "date", label: "Data", key: "date", required: true },
    { type: "time", label: "Hora", key: "time", required: true },
    { type: "number", label: "Preço", key: "price", required: true},
    { type: "textArea", label: "Observações", key: "observations", maxLength: 250, required: false },
    { type: "boolean", label: "Precisa De Manutenção", key: "needsMaintance", },
    { type: "boolean", label: "Pago", key: "payed", },
    { type: "boolean", label: "Atendido", key: "done" },
    { type: "imageList", label: "Imagens", key: "pictures", },
  ];

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post(`/${baseRoute}`, payload);
    }
    else{
      await api.put(`/${baseRoute}/${id}`, payload);
    }
  };
  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} baseRoute={baseRoute} redirect='atendimentos' />;
};

export default ApointmentForm;
