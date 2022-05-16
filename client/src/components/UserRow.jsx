function UserRow(props) {
  return (
    <tr id={props.data.userID}>
      <td>{props.data.userID}</td>
      <td>{props.data.userEmail}</td>
      <td>{props.data.userBirthday}</td>
      <td>{props.data.userLocation}</td>
      <td>
        <button onClick={() => props.deleteUser(props.data.userID)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
