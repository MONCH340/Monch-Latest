import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell"
function CouponRow(props) {
  return (
    <TableRow id={props.data.couponID}>
      <TableCell>{props.data.couponID}</TableCell>
      <TableCell>{props.data.couponDetails}</TableCell>
      <TableCell >
      <IconButton  aria-label="delete" size="small" onClick={() => props.deleteCoupons(props.data.couponID)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
export default CouponRow;
