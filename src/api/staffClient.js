import {
  getPersistedStaffToken,
} from "../auth/staffSessionController";
import {
  handleStaffUnauthorizedSession,
  isUnauthorizedResponsePayload,
} from "./authHandling";
import { createApiClient } from "./clientFactory";

const staffApiClient = createApiClient({
  getAuthToken: getPersistedStaffToken,
  onUnauthorized: handleStaffUnauthorizedSession,
  shouldHandleUnauthorized: isUnauthorizedResponsePayload,
});

export default staffApiClient;
