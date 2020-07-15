import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Insta_Context } from "./Context";
import { useHistory } from "react-router-dom";

export default function AutoCompleteSearch() {
  const { users, set_redirect, set_userProfileDisplay } = useContext(
    Insta_Context
  );

  const history = useHistory();

  const findUserByUserName = (selectedUser) => {
    const result = users.filter(
      (user) => user.userName === selectedUser.userName
    );
    return result;
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={users}
      getOptionLabel={(user) => user.userName}
      selectOnFocus={true}
      onChange={(e, value, reason) => {
        if (value) {
          const user = findUserByUserName(value);
          set_userProfileDisplay(user[0]);
          history.push("/profile");
        }
      }}
      style={{ width: "80%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for other users"
          variant="outlined"
          style={{ width: "100%", fontSize: "0.7rem" }}
        ></TextField>
      )}
    />
  );
}
