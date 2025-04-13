import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    item: '',
    unit_price: '',
    no_of_units_for_offer: '',
    special_price_on_offer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string to number only at submit time
    const formattedProduct = {
      item: product.item,
      unit_price: Number(product.unit_price),
      no_of_units_for_offer: product.no_of_units_for_offer === '' ? null : Number(product.no_of_units_for_offer),
      special_price_on_offer: product.special_price_on_offer === '' ? null : Number(product.special_price_on_offer)
    };

    onAddProduct(formattedProduct);

    // Optional: Reset form after submit
    setProduct({
      item: '',
      unit_price: '',
      no_of_units_for_offer: '',
      special_price_on_offer: ''
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Item Name"
          name="item"
          value={product.item}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Unit Price"
          name="unit_price"
          type="number"
          inputProps={{ min: 0 }}
          value={product.unit_price}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Units for Offer"
          name="no_of_units_for_offer"
          type="number"
          inputProps={{ min: 1 }}
          value={product.no_of_units_for_offer}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Special Price on Offer"
          name="special_price_on_offer"
          type="number"
          inputProps={{ min: 0 }}
          value={product.special_price_on_offer}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Product
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductForm;
