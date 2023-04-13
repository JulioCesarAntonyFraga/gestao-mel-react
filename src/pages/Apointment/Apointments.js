import React, { useEffect, useState } from 'react';
import { get, remove } from "../../services/api";
import generateTable from '../../components/Table';
import { message, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";

const Apointments = () => {
    const baseRoute = '/Apointments';
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
        navigate(`/atendimentos/${id}`);
    };
      
    const fields = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'date',
            title: 'Data',
            mask: 'date'
        },
        {
            dataIndex: 'time',
            title: 'Horário',
        },
        {
            dataIndex: 'price',
            title: 'Valor',
            prefix: 'R$'
        },
        {
            dataIndex: 'payed',
            title: 'Pago',
        },
        {
            dataIndex: 'done',
            title: 'Atendido',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '16px' }}>Atendimentos</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/atendimentos/novo">
                    <Button type="primary">Cadastrar</Button>
                </Link>
            </div>
        </div>
        
        {generateTable(data, fields, loading, handleDelete, handleEdit, successMessage)}
    </div>
  )
}

export default Apointments