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
