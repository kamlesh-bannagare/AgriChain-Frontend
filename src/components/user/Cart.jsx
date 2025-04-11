import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper
} from '@mui/material';

const Cart = ({ cart, onCheckout, onRemoveItem }) => {
  console.log("Cart data with calculation: ", cart)
  // const items=cart.items
  // console.log(typeof(items))
  // console.log(typeof(cart))
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.items.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.item}
                    secondary={`Quantity: ${item.quantity} - $${item.unit_price / 100} each`}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </ListItem>
                {item.no_of_units_for_offer > 0 && item.quantity >= item.no_of_units_for_offer && (
                  <Typography variant="body2" color="success.main" sx={{ ml: 2 }}>
                    Special offer applied! You saved {item.item_savings_percent}% on {Math.floor(item.quantity / item.no_of_units_for_offer)} sets
                  </Typography>
                )}
                <Divider />
              </div>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Subtotal: ${cart.totals.subtotal/100}
            </Typography>
            
            <Typography variant="h6" sx={{ mt: 1 }}>
              Discounted Total: ${cart.totals.discounted_total/ 100}
            </Typography>
            {cart?.totals?.savings_percent > 0 && (
              <Typography variant="body1" color="success.main">
                You save: {cart.totals.savings_percent}%
              </Typography>
            )}
            {cart?.totals?.total_savings > 0 && (
              <Typography variant="body1" color="success.main">
                Total Saving: ${cart.totals.total_savings/100}
              </Typography>
            )}


            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={onCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Cart;