import { Switch, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddSleepTime from "../AddSleepTime";

import classes from "./App.module.scss";
import { useAppState } from "../../store";
import { useEffect } from "react";

const PATHS = {
  home: "/",
  addSleepTime: "/add-sleep-time",
};

export default function App() {
  const { dispatch } = useAppState();

  useEffect(() => {
    void dispatch.getSleepRecords();
  }, [dispatch]);

  return (
    <Box className={classes.App}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Typography className={classes.slogan} variant="h6" component="div">
            Sleep Tracker 🌙
          </Typography>
          <Box className={classes.links} component="div">
            <Link to={PATHS.addSleepTime}>
              <Button
                className={classes.link}
                color="inherit"
                variant="outlined"
              >
                Add sleep time
              </Button>
            </Link>
            <Link to={PATHS.home}>
              <Button
                className={classes.link}
                color="inherit"
                variant="outlined"
              >
                View my sleep records
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.main} component="main">
        <Switch>
          <Route exact path={PATHS.home}>
            VIEW MY SLEEP RECORDS
          </Route>
          <Route path={PATHS.addSleepTime} component={AddSleepTime}></Route>
        </Switch>
      </Box>
    </Box>
  );
}
