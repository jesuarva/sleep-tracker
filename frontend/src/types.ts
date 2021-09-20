type UniqueIdentifier = string;
type ISODate = string;
type Float = Number;

interface User {
  _id: UniqueIdentifier;
  name: string;
  gender: "male" | "female";
}

interface SleepRecord {
  time: Float;
  date: ISODate;
}

export interface UserRecords extends User {
  sleepRecords: SleepRecord[];
}
// validate: {
//   validator: (val) =>
//     /(^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$)/.test(val),
//   message: `Date must be in format: YYYY-MM-DD`,
// },
