import React, { useEffect, useState } from 'react'
import { get } from "../../services/api";
import generateTable from '../../components/Table';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

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
        // setLoading(true);
        // ApiService.delete(`${baseRoute}/${id}`).then((response) => {
        //     ApiService.get(`${baseRoute}`).then((response => {
        //         setData(response.data);
        //         setLoading(false);
        //     }))
        //     successMessage('Deletado com sucesso')
        // }).catch((error) => {
        //     errorMessage('Algo deu errado')
        //     setLoading(false);
        // })
        
    };
    
    const handleEdit = (id) => {
        navigate(`/Produtos/${id}`);
    };
      
    const fields = [
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'name',
            title: 'Nome',
        },
        {
            dataIndex: 'coust',
            title: 'Custo',
            prefix: 'R$'
        },
        {
            dataIndex: 'price',
            title: 'Preço de venda',
            prefix: 'R$'
        },
        {
            dataIndex: 'profitPercentage',
            title: 'Porcentagem de lucro',
            prefix: '%'
        },
        {
            dataIndex: 'isRawMaterial',
            title: 'Material',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <h2>
            Produtos
        </h2>
        {generateTable(data, fields, loading, handleDelete, handleEdit, successMessage)}
    </div>
  )
}

export default Products
