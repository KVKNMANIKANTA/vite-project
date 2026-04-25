
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import StaffLoginSelection from './pages/StaffLoginSelection';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Shop from './pages/shop/Shop';
import Cart from './pages/shop/Cart';
import Payment from './pages/shop/Payment';
import MyOrders from './pages/shop/MyOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import CalfChatbot from './components/CalfChatbot';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

import { StaffProvider } from './context/StaffContext';

// ... (rest of imports)

function App() {
  return (
    <AuthProvider>
      <StaffProvider> {/* Validated: Added StaffProvider */}
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <Router>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/staff-access" element={<StaffLoginSelection />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute role="employee">
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee-dashboard" 
                    element={
                      <ProtectedRoute role="staff">
                        <EmployeeDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/shop" 
                    element={
                      <ProtectedRoute role="customer">
                        <Shop />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <ProtectedRoute role="customer">
                        <Cart />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/payment" 
                    element={
                      <ProtectedRoute role="customer">
                        <Payment />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/my-orders" 
                    element={
                      <ProtectedRoute role="customer">
                        <MyOrders />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
                <CalfChatbot />
              </Router>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </StaffProvider>
    </AuthProvider>
  );
}

export default App;
