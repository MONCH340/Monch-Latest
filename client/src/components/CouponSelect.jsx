import React from "react";

function CouponSelect(props) {
  return (
    <option value={props.data.couponID}>{props.data.couponDetails}</option>
  );
}

export default CouponSelect;
