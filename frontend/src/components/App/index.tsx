import { forwardRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import classes from "./App.module.scss";

const PATHS = {
  home: "/",
  addSleepTime: "add-sleep-time",
};

function App() {
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
            Add sleep time
          </Route>
          <Route exact path="/">
            VIEW MY SLEEP RECORDS
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
