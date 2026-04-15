import { useSelector } from "react-redux";

import { selectStaffToken, selectStaffUserData } from "../authSelectors";

export const useStaffAuth = () => {
  const token = useSelector(selectStaffToken);
  const userData = useSelector(selectStaffUserData);

  return { token, userData };
};

export default useStaffAuth;
