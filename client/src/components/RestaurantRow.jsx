import IconButton  from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function RestaurantRow(props) {
  let priceRange = {
    1: "$0-$15", 2: "$16-$30", 3: "$31-$50", 4: "$51-$100", 5: "101+"
  }
  return (
    <TableRow id={props.data.restaurantID}>
      <TableCell>{props.data.restaurantID}</TableCell>
      <TableCell>{props.data.restaurantName}</TableCell>
      <TableCell>{props.data.restaurantAddress}</TableCell>
      <TableCell>{props.data.restaurantCity}</TableCell>
      <TableCell>{priceRange[props.data.restaurantPriceRange]}</TableCell>
      <TableCell>{props.data.restaurantHasNutritionInfo ? "TRUE": "FALSE"}</TableCell>
      <TableCell>{props.data.couponDetails}</TableCell>
      <TableCell>
      <IconButton>
        <DeleteIcon
          onClick={() => props.deleteRestaurants(props.data.restaurantID)}
        />
      </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default RestaurantRow;
