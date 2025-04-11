import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        Available Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductGrid;