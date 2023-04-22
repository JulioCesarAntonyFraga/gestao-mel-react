import React, { useEffect, useState } from 'react';
import { get, remove } from "../../services/api";
import GenerateTable from '../../components/GenerateTable';
import { message, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";

const Warnings = () => {
    const baseRoute = '/Warnings';
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await get(baseRoute);
            setData(data);
            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

    const handleDelete = (id) => {
        setLoading(true);
        try{
            remove(baseRoute, id).then(() => {
                get(baseRoute).then((response) => {
                    setData(response);
                    setLoading(false);
                    successMessage('Deletado com sucesso');
                });
            });
        }
        catch{
            errorMessage('Algo deu errado');
            setLoading(false);
        }
    };
    
    const handleEdit = (id) => {
        navigate(`/manutencoes/${id}`);
    };
      
    const fields = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'date',
            title: 'Data',
            mask: 'date',
            sorterType: 'date',
        },
        {
            dataIndex: 'apointmentId',
            title: 'ID do atendimento',
        },
        {
            dataIndex: 'message',
            title: 'Mensagem',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <GenerateTable dataList={data} fieldsList={fields} loading={loading} handleDelete={handleDelete} handleEdit={handleEdit} successMessage={successMessage} />
    </div>
  )
}

export default Warnings