import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function IntersectionRow(props) {
  return (
    <TableRow id={props.data.restaurantsWithCategoriesID}>
      <TableCell>{props.data.restaurantsWithCategoriesID}</TableCell>
      <TableCell>{props.data.categoryName}</TableCell>
      <TableCell>{props.data.restaurantName}</TableCell>
      <TableCell >
        <IconButton  aria-label="delete" size="small" onClick={() => props.deleteIntersection(props.data.restaurantsWithCategoriesID)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default IntersectionRow;
