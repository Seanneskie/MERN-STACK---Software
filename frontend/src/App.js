import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import ProtectedRoute from './components/protectedRoute';
import AdminPage from './pages/admin-dashboard';
import RegistrationForm from './forms/registerForm';
import ProductForm from './forms/addProductForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={['admin']} children={<AdminPage />} />}
          />
          <Route
            path="/product"
            element={<ProtectedRoute allowedRoles={['admin']} children={<ProductForm />} />}
          />
          <Route
            path="/home"
            element={<ProtectedRoute allowedRoles={['user']} children={<Home/>} />}
          />
          <Route path='/register' element={<RegistrationForm  />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
