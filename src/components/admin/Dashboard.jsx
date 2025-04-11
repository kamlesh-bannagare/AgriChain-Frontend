import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

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

    fetchProducts();  // Call the function to fetch products
  }, []);  // Empty dependency array to run only once on component mount

console.log("products: ", products)
//   add product------------------------------------------------------------------------------------
  const handleAddProduct = async (product) => {
    console.log("adding product: ", product)
    try {
      // Send product to the backend
      const response = await fetch('http://localhost:8000/api/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: product.item,
          unit_price: product.unit_price, // In cents
          no_of_units_for_offer: product.no_of_units_for_offer,
          special_price_on_offer: product.special_price_on_offer, // In cents
        }),
      });

  
      if (response.ok) {
        const savedProduct = await response.json();
        setProducts((prev) => [...prev, savedProduct]);
        console.log('Product added successfully:', savedProduct);
      } else {
        const errorData = await response.json();
        console.error('Failed to add product:', errorData);
      }
    } catch (error) {
      console.error('Error while adding product:', error);
    }
  };
  

// Edit product function
const handleEdit = (product) => {
    console.log("in edit product: ", product)
    setEditingProduct(product);  // Set the selected product to be edited
  };

  // Update product function
  const handleUpdateProduct = async (updatedProduct) => {
    console.log("update Product: ", updatedProduct)
    try {
      const response = await fetch(`http://localhost:8000/api/product/${updatedProduct.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: updatedProduct.item,
          unit_price: updatedProduct.unit_price,
          no_of_units_for_offer: updatedProduct.no_of_units_for_offer,
          special_price_on_offer: updatedProduct.special_price_on_offer,
        }),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts(products.map(p => p.id === updatedProduct.id ? savedProduct : p));  // Update product list
        setEditingProduct(null);  // Clear editing state
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error while updating product:', error);
    }
  };

  // Delete product function
  const handleDelete = async (id) => {
    console.log("id: ", id)
    try {
      const response = await fetch(`http://localhost:8000/api/product/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));  // Remove product from state
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Error while deleting product:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        Admin Dashboard
      </Typography>
      <ProductForm 
        onAddProduct={handleAddProduct} 
        onUpdateProduct={handleUpdateProduct}
        editingProduct={editingProduct}
      />
      <ProductList 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </Container>
  );
};

export default Dashboard;