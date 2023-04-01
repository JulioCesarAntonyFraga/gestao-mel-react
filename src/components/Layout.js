import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import { Layout as AntdLayout } from 'antd';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children }) => {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <AntdLayout>
            {isAuthenticated ? <Sidebar /> : null}
            {children}
        </AntdLayout>
    );
};

export default Layout;