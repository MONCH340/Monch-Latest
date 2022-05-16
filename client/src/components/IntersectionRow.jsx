function IntersectionRow(props) {
  return (
    <tr id={props.data.restaurantsWithCategoriesID}>
      <td>{props.data.restaurantsWithCategoriesID}</td>
      <td>{props.data.category}</td>
      <td>{props.data.restaurant}</td>
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
