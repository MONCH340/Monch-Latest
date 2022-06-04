import React, { useEffect, useState } from "react";
import CouponRow from "../components/CouponRow";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material/";

function Coupons() {
  const [coupons, setCoupons] = useState([{}]);
  const [couponDetails, setCouponDetails] = useState("");

  useEffect(() => {
    readCoupons();
  }, []);

  function readCoupons() {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons`)
      .then((response) => response.json())
      .then((data) => setCoupons(data));
  }

  function deleteCoupon(id) {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons/${id}`, {
      method: "DELETE",
    }).then(() => console.log(`deleting ${id}`));
    const allCoupons = [...coupons];
    let updatedCoupons = allCoupons.filter((coupon) => coupon.couponID !== id);
    setCoupons(updatedCoupons);
  }

  function createCoupon(event) {
    event.preventDefault();
    let newCoupon = {
      couponDetails: couponDetails,
    };
    postCoupon(newCoupon)
  }

  async function postCoupon(newCoupon) {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCoupon),
    }).then((response) => response.json())
    .then(() => readCoupons());;
  }

  function onChangeCoupon(event) {
    setCouponDetails(event.target.value);
  }
  
  return (
    <div>
      <h1>Coupon</h1>
      
      <form onSubmit={createCoupon}>
        <h2> Add a known Coupon</h2>
        <label>Enter Coupon Details</label>
        <br />
        <input
          type="text"
          name="couponDetails"
          id="couponDetails"
          onChange={(e) => onChangeCoupon(e)}
        />
        <br />
        <button>Submit</button>
      </form>

    
      <h2>Coupon Table</h2>
      <Table>
        <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Details</TableCell>
          <TableCell>Remove</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => {
            return <CouponRow data={coupon} deleteCoupons={deleteCoupon} key={coupon.couponID}/>;
          })}
        </TableBody>
      </Table>
    
    </div>
  );
}

export default Coupons;
