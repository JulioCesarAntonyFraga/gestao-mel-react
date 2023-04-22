import React, { useEffect, useState  } from 'react'
import { get, remove } from "../../services/api";
import GenerateTable from '../../components/GenerateTable';
import { message, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom";

const ProductStockMovements = () => {
    const baseRoute = '/ProductStockMovements';
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
        errorMessage('Não é possível excluir Movimentações De Estoque');
    };
    
    const handleEdit = (id) => {
        navigate(`/estoque/${id}`);
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
            dataIndex: 'typeName',
            title: 'Tipo',
            sorterType: 'text',
        },
        {
            dataIndex: 'amount',
            title: 'Quantidade',
            sorterType: 'numeric',
            mask: 'int',
        },
        {
            dataIndex: 'productId',
            title: 'Produto',
            getByIdRoute: 'Products',
            getByIdKey: 'name',
            mask: 'getById',
            sorterType: 'getById',
        },
      ];

  return (
    
    <div>
        {contextHolder}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '16px' }}>Movimentações De Estoque</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/estoque/novo">
                    <Button type="primary">Cadastrar</Button>
                </Link>
            </div>
        </div>
        <GenerateTable dataList={data} fieldsList={fields} loading={loading} handleDelete={handleDelete} handleEdit={handleEdit} successMessage={successMessage} />
    </div>
  )
}

export default ProductStockMovements