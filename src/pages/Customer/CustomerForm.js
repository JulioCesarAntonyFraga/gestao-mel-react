import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const campos = [
  { type: "text", label: "ID", key: "id", disabled: true, },
  { type: "text", label: "Nome", key: "name", maxLength: 40, required: true, minLength: 5 },
  { type: "text", label: "Instagram", key: "instagram", prefix: '@', maxLength: 25, required: true },
  { type: "number", label: "Celular", key: "phoneNumber", required: true, maxLength: 11, minLength: 10 },
  { type: "date", label: "Data de Nascimento", key: "dob", required: true },
  { type: "boolean", label: "Seguindo No Instagram", key: "isFollowingInstagram", },
  { type: "file", label: "Foto De Perfil", key: "profitPercentage" },
  { type: "textArea", label: "Observações", key: "observations" },
];

const CustomerForm = (props) => {
  const { id } = useParams();
  const baseRoute = 'customers'

  const handleSubmit = async (payload, isEdit) => {
    if(!isEdit){
      await api.post(`/${baseRoute}`, payload);
    }
    else{
      await api.put(`/${baseRoute}/${id}`, payload);
    }
  };

  return <DynamicForm campos={campos} onSubmit={handleSubmit} id={id} baseRoute={baseRoute} redirect='clientes' />;
};

export default CustomerForm;
