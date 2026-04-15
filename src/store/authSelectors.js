export const selectStudentAuth = (state) => state.studentAuth;
export const selectStudentToken = (state) => state.studentAuth.token;
export const selectStudentUserData = (state) => state.studentAuth.userData;

export const selectStaffAuth = (state) => state.staffAuth;
export const selectStaffToken = (state) => state.staffAuth.token;
export const selectStaffUserData = (state) => state.staffAuth.userData;
