import React, { useEffect, useState } from "react";
import CouponRow from "../components/CouponRow";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material/";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Coupons() {
  const [coupons, setCoupons] = useState([{}]);
  const [couponDetails, setCouponDetails] = useState("");

  useEffect(() => {
    readCoupons();
  }, []);

  // get all coupons
  function readCoupons() {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons`)
      .then((response) => response.json())
      .then((data) => setCoupons(data));
  }

  // delete a coupon
  function deleteCoupon(id) {
    fetch(`https://dry-bayou-57145.herokuapp.com/backend/coupons/${id}`, {
      method: "DELETE",
    }).then(() => console.log(`deleting ${id}`));
    const allCoupons = [...coupons];
    let updatedCoupons = allCoupons.filter((coupon) => coupon.couponID !== id);
    setCoupons(updatedCoupons);
  }


  // create a coupon
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
      
      <Form onSubmit={createCoupon}>
        <h2> Add a known Coupon</h2>
        <Form.Group>
        <Form.Label >Coupon Details</Form.Label >
        <Form.Control
          type="text"
          name="couponDetails"
          id="couponDetails"
          onChange={(e) => onChangeCoupon(e)}
        />
        </Form.Group>
        <Button variant="primary" type="submit" value="Submit">Submit </Button>
      </Form>

    
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
