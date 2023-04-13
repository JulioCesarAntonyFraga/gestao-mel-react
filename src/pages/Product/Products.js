import React, { useEffect, useState } from 'react'
import { get, remove } from "../../services/api";
import generateTable from '../../components/Table';
import { message, Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";

const Products = () => {
    const baseRoute = '/Products';
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
        navigate(`/produtos/${id}`);
    }

    const fields = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'name',
            title: 'Nome',
            sorterType: 'text',
        },
        {
            dataIndex: 'stock',
            title: 'Estoque',
            mask: 'int',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'coust',
            title: 'Custo',
            prefix: 'R$',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'price',
            title: 'Preço de venda',
            prefix: 'R$',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'profitPercentage',
            title: 'Porcentagem de lucro',
            prefix: '%',
            sorterType: 'numeric',
        },
        {
            dataIndex: 'isRawMaterial',
            title: 'Material',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '16px' }}>Produtos</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/produtos/novo">
                    <Button type="primary">Cadastrar</Button>
                </Link>
            </div>
        </div>
        {generateTable(data, fields, loading, handleDelete, handleEdit, successMessage)}
    </div>
  )
}

export default Products
