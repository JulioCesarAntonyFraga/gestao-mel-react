import React, { useEffect, useState } from 'react'
import { get, remove } from "../../services/api";
import generateTable from '../../components/Table';
import { message, Button } from 'antd';
import { useNavigate } from "react-router-dom";

const Sales = () => {
    const baseRoute = '/Sales';
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
        navigate(`/vendas/${id}`);
    };
      
    const fields = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'createdAt',
            title: 'Data',
            mask: 'timestamp',
            sorterType: 'date',
        },
        {
            dataIndex: 'totalCoust',
            title: 'Custo total',
            prefix: 'R$',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'totalPrice',
            title: 'Preço de venda total',
            prefix: 'R$',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'discountPercentage',
            title: 'Desconto',
            prefix: '%',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'profit',
            title: 'Lucro',
            prefix: 'R$',
            sorterType: 'numeric',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '16px' }}>Vendas</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary">Cadastrar</Button>
            </div>
        </div>
        {generateTable(data, fields, loading, handleDelete, handleEdit, successMessage)}
    </div>
  )
}

export default Sales