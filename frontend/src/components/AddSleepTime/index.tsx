import { ChangeEvent, SyntheticEvent, useState } from "react";
import classNames from "classnames";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import classes from "./AddSleepTime.module.scss";
import { Button } from "@mui/material";
import { useAppState } from "../../store";

export const testIds = {
  root: "add-sleep-record",
  input: "add-sleep-record-input",
  inputLabel: "add-sleep-record-input-label",
};

type Genders = "female" | "male";

export default function AddSleepTime() {
  const { dispatch } = useAppState();
  const [name, setName] = useState<string>();
  const [gender, setGender] = useState<Genders>("female");
  const [date, setDate] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  return (
    <Paper
      className={classes.form}
      component="form"
      data-testid={testIds.root}
      elevation={3}
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        console.log("SUBMIT");
      }}
    >
      <Typography variant="h2" gutterBottom component="div">
        Add sleep time
      </Typography>

      <TextField
        variant="standard"
        type="text"
        label="Name"
        value={name}
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        classes={{
          root: classes.input,
        }}
      />
      <FormControl className={classes.input} variant="standard">
        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={gender}
          label="Gender"
          onChange={(event: SelectChangeEvent) => {
            setGender(event.target.value as Genders);
          }}
        >
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
      </FormControl>

      <TextField
        variant="standard"
        type="date"
        label="Date"
        value={date}
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        // onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        //   if (e.code === "Enter") e.preventDefault();
        // }}
        classes={{
          root: classes.input,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: new Date().toISOString().split("T")[0],
        }}
      />

      <Typography variant="h5" gutterBottom component="div">
        Sleep time
      </Typography>

      <Box className={classes.sleepTime}>
        <TextField
          variant="standard"
          type="number"
          label="Hours"
          value={hours}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHours(Number(e.target.value))
          }
          classes={{
            root: classNames(classes.input, classes.sleepTimeInput),
          }}
          inputProps={{
            min: 0,
            max: 23,
            step: 1,
          }}
        />
        <TextField
          variant="standard"
          type="number"
          label="Minutes"
          value={minutes}
          fullWidth
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMinutes(Number(e.target.value))
          }
          classes={{
            root: classNames(classes.input, classes.sleepTimeInput),
          }}
          inputProps={{
            min: 0,
            max: 59,
            step: 15,
          }}
        />
      </Box>
      <Button className={classes.submit} type="submit" variant="outlined">
        Submit
      </Button>
    </Paper>
  );
}
