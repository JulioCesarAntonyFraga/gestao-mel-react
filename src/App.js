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
import ProductForm from './pages/Product/ProductForm';
import CustomerForm from './pages/Customer/CustomerForm';
import ApointmentForm from './pages/Apointment/ApointmentForm';
import ProductStockMovementForm from './pages/ProductStockMovement/ProductStockMovementForm';
import SaleForm from './pages/Sale/SaleForm';

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

                <Route path="/atendimentos" element={<PrivateRoute element={<Apointments />} />} />
                <Route path="/atendimentos/:id" element={<PrivateRoute element={<ApointmentForm />} />} />
                <Route path="/atendimentos/novo" element={<PrivateRoute element={<ApointmentForm />} />} />

                <Route path="/estoque" element={<PrivateRoute element={<ProductStockMovements />} />} />
                <Route path="/estoque/:id" element={<PrivateRoute element={<ProductStockMovementForm />} />} />
                <Route path="/estoque/novo" element={<PrivateRoute element={<ProductStockMovementForm />} />} />

                <Route path="/clientes" element={<PrivateRoute element={<Customers />} />} />
                <Route path="/clientes/:id" element={<PrivateRoute element={<CustomerForm />} />} />
                <Route path="/clientes/novo" element={<PrivateRoute element={<CustomerForm />} />} />

                <Route path="/produtos" element={<PrivateRoute element={<Proudcts />} />} />
                <Route path="/produtos/:id" element={<PrivateRoute element={<ProductForm />} />} />
                <Route path="/produtos/novo" element={<PrivateRoute element={<ProductForm />} />} />

                <Route path="/vendas" element={<PrivateRoute element={<Sales />} />} />
                <Route path="/vendas/:id" element={<PrivateRoute element={<SaleForm />} />} />
                <Route path="/vendas/novo" element={<PrivateRoute element={<SaleForm />} />} />

                {/* <Route path="/produtos/:id"/> */}
              </Routes>
            </main>
          </AntdLayout>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
