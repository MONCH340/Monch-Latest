import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function CategoryRow(props) {
  return (
    <TableRow id={props.data.categoryID}>
      <TableCell>{props.data.categoryID}</TableCell>
      <TableCell>{props.data.categoryName}</TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => props.deleteCategory(props.data.categoryID)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default CategoryRow;
