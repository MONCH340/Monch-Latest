import React, {useState} from 'react';
import NavBar from "../components/NavBar";
import {sample_coupons} from "../sample_data/coupons"
import CouponRow from "../components/CouponRow";

function Coupons() {
    const [coupons, setCoupons] = useState(sample_coupons)

    function deleteCoupon() {
        alert("Deleting Coupon")
    }

    return (
        <div>
            <h1>Coupon</h1>
            <h2>Coupon Table</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Details</th>
                </tr>
                <tr>
                    {coupons.map((coupon) => {
                        return <CouponRow data={coupon} deleteCoupons={deleteCoupon}/>
                    })}

                </tr>
            </table>
            <form>
                <h2> Add a known Coupon</h2>
                <label>Enter Coupon Details</label>
                <br/>
                <input type="text"/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )

}

export default Coupons