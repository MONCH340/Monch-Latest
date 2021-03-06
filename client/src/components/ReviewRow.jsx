import IconButton  from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Rating from "@mui/material/Rating"

function ReviewRow(props) {
  return (
    <TableRow id={props.data.reviewID}>
      <TableCell>{props.data.reviewID}</TableCell>
      <TableCell>{props.data.restaurantName}</TableCell>
      <TableCell>{props.data.reviewContent}</TableCell>
      <TableCell>
      <Rating name="half-rating-read" defaultValue={props.data.reviewStar}  readOnly />
      </TableCell>
      <TableCell>{props.data.userEmail}</TableCell>
      <TableCell>{props.data.reviewDate.slice(0,10)}</TableCell>
      <TableCell>
      <IconButton  aria-label="delete" size="small"onClick={() => props.deleteReview(props.data.reviewID)}>
          <DeleteIcon />
      </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ReviewRow;
