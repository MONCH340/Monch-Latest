function RestaurantSelect(props) {
  return (
    <option value={props.data.restaurantID}>{props.data.restaurantName}</option>
  );
}

export default RestaurantSelect;
