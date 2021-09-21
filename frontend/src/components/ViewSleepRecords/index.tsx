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
import { MouseEvent, useEffect, useState } from "react";
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
  const [chartOptions, setChartOptions] = useState<{
    xAxisData: string[];
    seriesData: number[] | [];
  }>({ xAxisData: getXAxisData(), seriesData: [] });

  useEffect(() => {
    if (pickedUser) {
      setChartOptions(({ xAxisData }) => ({
        xAxisData,
        seriesData: getSeriesData(xAxisData, pickedUser),
      }));
    }
  }, [pickedUser]);

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
                data: chartOptions.xAxisData,
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: chartOptions.seriesData,
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

function getXAxisData(): string[] {
  const today = new Date();
  return new Array(7)
    .fill(null)
    .map((value, i) => {
      if (i === 0) return today.toISOString().split("T")[0];
      else {
        const newDay = new Date(today);
        newDay.setDate(today.getDate() - i);
        return newDay.toISOString().split("T")[0];
      }
    })
    .reverse();
}

function getSeriesData(xAxisData: string[], pickedUser: UserRecords): number[] {
  const series = xAxisData.map((day) => {
    const sleepRecords = pickedUser.sleepRecords.filter(
      (record) => record && day === record.date.split("T")[0]
    );

    if (sleepRecords.length) {
      return sleepRecords.reduce((acc, record) => acc + record.time, 0);
    } else return 0;
  });

  return series;
}
