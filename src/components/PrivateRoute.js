import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if(isAuthenticated){
    return element;
  }
  else{
    return <Navigate to="/login" />
  }
};

export default PrivateRoute;
