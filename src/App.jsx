import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import { ShoppingCart, Dashboard } from '@mui/icons-material';

function App() {
  return (
    <Router>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            AgriChain
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              startIcon={<ShoppingCart />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Marketplace
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/admin" 
              startIcon={<Dashboard />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Admin
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              component={Link} 
              to="/" 
              size="small"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <ShoppingCart />
            </Button>
            <Button 
              color="primary" 
              variant="outlined" 
              component={Link} 
              to="/admin" 
              size="small"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <Dashboard />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
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