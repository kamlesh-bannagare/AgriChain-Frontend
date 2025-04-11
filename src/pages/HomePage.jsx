import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ProductGrid from '../components/user/ProductGrid';
import Cart from '../components/user/Cart';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const HomePage = () => {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //   get all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/product/');  // Adjust API URL
        if (response.ok) {
          const data = await response.json();
          setProducts(data);  // Set the fetched products to state
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    //  Fetching the updated cart from backend and update local state
    const fetchCarts = async () =>{
      const cartResponse = await fetch('http://localhost:8000/api/cart/1');
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCart(cartData);
      } else {
        console.error('Failed to fetch updated cart');
      }
    }
    

    fetchProducts();  // Call the function to fetch products
    fetchCarts();
  }, []);  // Empty dependency array to run only once on component mount


  const handleAddToCart = async (product) => {
    console.log("Product added: ", product);
  
    const payload = {
      user_id: 1, 
      item_id: product.id,
      item: product.item,
      unit_price: product.unit_price,
      no_of_units_for_offer: product.no_of_units_for_offer,
      special_price_on_offer: product.special_price_on_offer
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      // Parsing response
      const result = await response.json();
      console.log("Item added to backend cart:", result);
  
      //  Fetching the updated cart from backend and update local state
      const cartResponse = await fetch('http://localhost:8000/api/cart/1');
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCart(cartData);
      } else {
        console.error('Failed to fetch updated cart');
      }
  
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setCart([]);                   
    navigate('/checkout');        
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 4,
          backgroundImage: 'linear-gradient(rgba(46, 125, 50, 0.9), rgba(46, 125, 50, 0.9)), url(https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Fresh Farm Products
                </Typography>
                <Typography variant="h5" component="p" gutterBottom sx={{ mb: 3 }}>
                  Direct from local farmers to your table
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  href="#products"
                  sx={{ fontWeight: 600 }}
                >
                  Shop Now
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Fresh vegetables"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: 6,
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" id="products">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            {!isMobile && (
              <Box position="sticky" top={80}>
                <Cart 
                  cart={cart} 
                  onCheckout={handleCheckout} 
                  onRemoveItem={handleRemoveItem} 
                />
              </Box>
            )}
            {isMobile && (
              <Cart 
                cart={cart} 
                onCheckout={handleCheckout} 
                onRemoveItem={handleRemoveItem} 
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;