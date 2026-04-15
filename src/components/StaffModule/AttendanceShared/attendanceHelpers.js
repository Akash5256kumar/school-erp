import moment from "moment";

export const formatAttendanceDate = (date) =>
  date ? moment(date).format("DD/MM/YYYY") : "";

export const formatAttendanceTime = (date) =>
  date ? moment(date).format("hh:mm A") : "";

export const formatAttendanceApiDate = (date) =>
  date ? moment(date).format("YYYY-MM-DD") : "";
