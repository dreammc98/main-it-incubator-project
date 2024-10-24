import React from "react";
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { selectStatus } from "app/appSlice";
import { useAppDispatch } from "common/hooks";
import { authThunks, selectIsLoggedIn } from "features/auth/model/authSlice";
import { useSelector } from "react-redux";
import { Menu } from "@mui/icons-material";

export const Header = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">News</Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
