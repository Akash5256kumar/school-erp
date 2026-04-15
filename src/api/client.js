import {
  getPersistedStudentToken,
} from "../auth/studentSessionController";
import {
  handleStudentUnauthorizedSession,
  isUnauthorizedResponsePayload,
} from "./authHandling";
import { createApiClient } from "./clientFactory";

export const apiClient = createApiClient({
  getAuthToken: getPersistedStudentToken,
  onUnauthorized: handleStudentUnauthorizedSession,
  shouldHandleUnauthorized: isUnauthorizedResponsePayload,
});

export default apiClient;
