import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ProductForm = ({ onAddProduct, onUpdateProduct, editingProduct }) => {
  const [product, setProduct] = useState({
    item: '',
    unit_price: null,
    no_of_units_for_offer: null,
    special_price_on_offer: null
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct({ ...editingProduct });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: ['unit_price', 'no_of_units_for_offer', 'special_price_on_offer'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }

    // if (!editingProduct) {
    //   setProduct({
    //     item: '',
    //     unit_price: null,
    //     no_of_units_for_offer: null,
    //     special_price_on_offer: null
    //   });
    // }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingProduct ? 'Edit Product' : 'Add New Product'}
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
          value={product.no_of_units_for_offer}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Special Price on Offer"
          name="special_price_on_offer"
          type="number"
          value={product.special_price_on_offer}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductForm;
