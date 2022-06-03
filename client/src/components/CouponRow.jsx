import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell"
function CouponRow(props) {
  return (
    <tr id={props.data.couponID}>
      <td>{props.data.couponID}</td>
      <td>{props.data.couponDetails}</td>
      <td>
        <button onClick={() => props.deleteCoupons(props.data.couponID)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
export default CouponRow;
