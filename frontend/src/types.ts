type ISODate = String;
type Float = Number;

interface User {
  name: string;
  gender: "male" | "female";
}

interface SleepRecords {
  time: Float;
  date: ISODate;
}

export interface UserRecords extends User {
  sleepRecords: SleepRecords[];
}
// validate: {
//   validator: (val) =>
//     /(^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$)/.test(val),
//   message: `Date must be in format: YYYY-MM-DD`,
// },
