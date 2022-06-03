import React from "react";

function CategorySelect(props){
    return (
        <option value={props.data.categoryID}>{props.data.categoryName}</option>
    );
}

export default CategorySelect;