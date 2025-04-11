import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Units for Offer</TableCell>
              <TableCell>Special Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.item}</TableCell>
                <TableCell>{product.unit_price}</TableCell>
                <TableCell>{product.no_of_units_for_offer}</TableCell>
                <TableCell>{product.special_price_on_offer}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(product)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(product.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductList;