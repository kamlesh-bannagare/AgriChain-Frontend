import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
  Chip,
  Box
} from '@mui/material';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  const unitPrice = product.unit_price;
  const specialPrice = product.special_price_on_offer;
  console.log("product on cart: ", product)
  const number_of_units = parseFloat(product.no_of_units_for_offer);
  const unit_price = parseFloat(product.unit_price);
  const special_offer = parseFloat(product.special_price_on_offer);

  let discountPercentage = 0;

  if (number_of_units > 0) {
    discountPercentage = Math.round(
      ((number_of_units * unit_price - special_offer) /
        (number_of_units * unit_price)) * 100
    );
  }


  console.log("discount_per: ", discountPercentage)

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {product.item}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
              {unitPrice} cents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              per unit
            </Typography>
          </Box>
          {product.no_of_units_for_offer > 0 && (
            <Box sx={{ mb: 1 }}>
              <Chip
                label={`${product.no_of_units_for_offer} for ${specialPrice} cents (Save ${discountPercentage}%)`}
                color="secondary"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onAddToCart(product)}
            fullWidth
            sx={{ mx: 1 }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;