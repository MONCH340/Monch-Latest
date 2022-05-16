function CategoryRow(props) {
  return (
    <tr id={props.data.categoryID}>
      <td>{props.data.categoryID}</td>
      <td>{props.data.categoryName}</td>
      <td>
        <button onClick={() => props.deleteCategories(props.data.categoryID)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CategoryRow;
