function IntersectionRow(props) {
  return (
    <tr id={props.data.restaurantsWithCategoriesID}>
      <td>{props.data.restaurantsWithCategoriesID}</td>
      <td>{props.data.categoryName}</td>
      <td>{props.data.restaurantName}</td>
      <td>
        <button
          onClick={() =>
            props.deleteIntersection(props.data.restaurantsWithCategoriesID)
          }
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default IntersectionRow;
