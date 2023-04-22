import { UserOutlined, TeamOutlined, HomeOutlined, ShoppingCartOutlined, DollarOutlined, CalendarOutlined, DropboxOutlined, LoginOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const { Sider } = Layout;

const Sidebar = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const SignOut = async () => {
    await logout();
    navigate('/login');
  }

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedItem = localStorage.getItem('selectedItem');
    if (storedItem) {
      setSelectedItem(storedItem);
    }
  }, []);

  const handleMenuClick = (event) => {
    const { key } = event;
    setSelectedItem(key);
    localStorage.setItem('selectedItem', key);
  };

  return (
      <Sider breakpoint="lg" collapsedWidth="0" style={{ height: '150vh', float: 'left' }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={handleMenuClick} selectedKeys={[selectedItem]}>
          <Menu.Item key="1">
            <Link to="/">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/usuarios">
              <UserOutlined />
              <span>Usuários</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3"  >
            <Link to="/clientes">
              <TeamOutlined />
              <span>Clientes</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4"  >
            <Link to="/produtos">
              <ShoppingCartOutlined />
              <span>Produtos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5"  >
            <Link to="/vendas">
              <DollarOutlined />
              <span>Vendas</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6"  >
            <Link to="/atendimentos">
              <CalendarOutlined />
              <span>Atendimentos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7"  >
            <Link to="/manutencoes">
              <ClockCircleOutlined />
              <span>Manutenções</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="8"  >
            <Link to="/estoque">
              <DropboxOutlined />
              <span>Movimentações</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="9" onClick={() => SignOut()}>
            <LoginOutlined />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
  );
};

export default Sidebar;