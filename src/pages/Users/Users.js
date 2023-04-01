import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getUsers } from "../../api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default UsersPage;
