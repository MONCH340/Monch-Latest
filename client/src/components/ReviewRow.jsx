function ReviewRow(props) {
  return (
    <tr id={props.data.reviewID}>
      <td>{props.data.reviewID}</td>
      <td>{props.data.restaurantName}</td>
      <td>{props.data.reviewContent}</td>
      <td>{props.data.reviewDate}</td>
      <td>{props.data.reviewStar}</td>
      <td>
        <button onClick={() => props.deleteReview(props.data.reviewID)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReviewRow;
