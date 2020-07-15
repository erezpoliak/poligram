import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Insta_Context } from "./Context";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export default function AutoCompleteSearch() {
  const { users, set_redirect, set_userProfileDisplay } = useContext(
    Insta_Context
  );

  const history = useHistory();
  const classes = useStyles();

  const findUserByUserName = (selectedUser) => {
    const result = users.filter(
      (user) => user.userName === selectedUser.userName
    );
    return result;
  };

  return (
    <Autocomplete
      className={classes.searchBox}
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

const useStyles = makeStyles({
  searchBox: {
    width: "80%",
    "& .MuiFormLabel-root": {
      color: "#757575",
    },
  },
});
