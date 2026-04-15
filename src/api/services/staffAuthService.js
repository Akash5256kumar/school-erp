import staffApiClient from "../staffClient";

export const loginStaff = async (payload) =>
  staffApiClient.post("staff_login", payload, {
    skipAuth: true,
  });
