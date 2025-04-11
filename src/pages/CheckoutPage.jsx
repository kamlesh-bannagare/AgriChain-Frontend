import { 
    Typography, 
    Button, 
    Container, 
    Box, 
    Paper
  } from '@mui/material';
  import { CheckCircleOutline } from '@mui/icons-material';
  import { Link } from 'react-router-dom';
  import { motion } from 'framer-motion';
  
  const CheckoutPage = () => {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}>
            <CheckCircleOutline sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Order Confirmed!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Thank you for your purchase
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Your order has been placed successfully. We've sent a confirmation email with your order details.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/" 
                size="large"
                sx={{ px: 4 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    );
  };
  
  export default CheckoutPage;