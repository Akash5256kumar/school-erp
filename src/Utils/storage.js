export { storage } from "../auth/sessionStorage";
import { persistStudentSession as persistStudentSessionController } from "../auth/studentSessionController";

export const persistStudentSession = (payload) =>
  persistStudentSessionController(payload);
