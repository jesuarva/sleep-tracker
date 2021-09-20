import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppState } from "../../store";
import classes from "./ViewSleepRecords.module.scss";
import { MouseEvent, useState } from "react";
import { UserRecords } from "../../types";
import { EChart } from "./Echart";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f08080",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    cursor: "pointer",
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ViewSleepRecords() {
  const { state } = useAppState();

  const [pickedUser, setPickedUser] = useState<UserRecords>();

  return (
    <Paper
      id="Add user form"
      className={classes.root}
      component="div"
      elevation={3}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="right">
                Number of sleep records
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.sleepRecords.map((userRecord) => (
              <StyledTableRow
                key={userRecord._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(_e: MouseEvent<unknown>) => setPickedUser(userRecord)}
              >
                <TableCell component="th" scope="row">
                  {userRecord.name}
                </TableCell>
                <TableCell align="left">{userRecord.gender}</TableCell>
                <TableCell align="right">
                  {userRecord.sleepRecords.length}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper
        id="Add user form"
        className={classes.root}
        component="div"
        elevation={3}
      >
        {pickedUser && (
          <EChart
            style={{ flex: "1 0 auto" }}
            option={{
              xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: [120, 200, 150, 80, 70, 110, 130],
                  type: "bar",
                },
              ],
            }}
          />
        )}
      </Paper>
    </Paper>
  );
}
