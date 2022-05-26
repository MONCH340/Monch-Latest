import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function UserRow(props) {
  return (
    <TableRow id={props.data.userID}>
      <TableCell >{props.data.userID}</TableCell>
      <TableCell >{props.data.userEmail}</TableCell >
      <TableCell >{props.data.userBirthday.slice(0,10)}</TableCell >
      <TableCell >{props.data.userLocation}</TableCell >
      <TableCell >
        <IconButton  aria-label="delete" size="small" onClick={() => props.deleteUser(props.data.userID)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default UserRow;
