import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import './App.css';
import './index.css';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Users from './pages/User/Users';
import { Layout as AntdLayout } from 'antd';
import Layout from './components/Layout'
import Customers from './pages/Customer/Customers';
import Apointments from './pages/Apointment/Apointments';
import Sales from './pages/Sale/Sales';
import Proudcts from './pages/Product/Products';
import ProductStockMovements from './pages/ProductStockMovement/ProductStockMovements';
import Home from './pages/Home';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AntdLayout>
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/usuarios" element={<PrivateRoute element={<Users />} />} />
                <Route path="/clientes" element={<PrivateRoute element={<Customers />} />} />
                <Route path="/atendimentos" element={<PrivateRoute element={<Apointments />} />} />
                <Route path="/estoque" element={<PrivateRoute element={<ProductStockMovements />} />} />
                <Route path="/clientes" element={<PrivateRoute element={<Customers />} />} />
                <Route path="/produtos" element={<PrivateRoute element={<Proudcts />} />} />
                <Route path="/vendas" element={<PrivateRoute element={<Sales />} />} />
              </Routes>
            </main>
          </AntdLayout>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
