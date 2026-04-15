import { useSelector } from "react-redux";

import {
  selectStudentToken,
  selectStudentUserData,
} from "../authSelectors";

export const useStudentAuth = () => {
  const token = useSelector(selectStudentToken);
  const userData = useSelector(selectStudentUserData);

  return { token, userData };
};

export default useStudentAuth;
