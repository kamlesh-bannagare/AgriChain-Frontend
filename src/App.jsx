import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {  Container } from '@mui/material';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import MyAppBar from './components/common/AppBar';

function App() {
  return (
    <Router>
      <MyAppBar />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;