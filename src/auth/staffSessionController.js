import AsyncStorage from "@react-native-community/async-storage";

import { STORAGE_KEYS } from "../constants";
import store from "../store";
import {
  clearUserData,
  saveUserData,
} from "../store/slices/userSlice";
import {
  clearStaffAuth,
  setStaffAuth,
} from "../store/slices/staffAuthSlice";
import { AUTH_ROLES } from "./roles";
import { storage } from "./sessionStorage";
import { normalizeAuthToken } from "./tokenUtils";

const STAFF_SESSION_KEYS = [
  STORAGE_KEYS.staffId,
  STORAGE_KEYS.staffJwt,
  STORAGE_KEYS.staffUserData,
  STORAGE_KEYS.staffName,
  STORAGE_KEYS.staffEmail,
  STORAGE_KEYS.staffRole,
  STORAGE_KEYS.staffAssignedClass,
  STORAGE_KEYS.staffAssignedSection,
  STORAGE_KEYS.staffCreatedAt,
];

const LEGACY_SESSION_KEYS = [
  STORAGE_KEYS.token,
  STORAGE_KEYS.legacyToken,
  STORAGE_KEYS.userData,
  STORAGE_KEYS.id,
  STORAGE_KEYS.name,
  STORAGE_KEYS.email,
  STORAGE_KEYS.role,
  STORAGE_KEYS.aClass,
  STORAGE_KEYS.aSection,
  STORAGE_KEYS.date,
];

const buildStaffSession = async () => {
  const [
    token,
    userData,
    id,
    name,
    email,
    role,
    assignedClass,
    assignedSection,
    createdAt,
  ] = await Promise.all([
    storage.getString(STORAGE_KEYS.staffJwt),
    storage.getJSON(STORAGE_KEYS.staffUserData),
    storage.getString(STORAGE_KEYS.staffId),
    storage.getString(STORAGE_KEYS.staffName),
    storage.getString(STORAGE_KEYS.staffEmail),
    storage.getString(STORAGE_KEYS.staffRole),
    storage.getString(STORAGE_KEYS.staffAssignedClass),
    storage.getString(STORAGE_KEYS.staffAssignedSection),
    storage.getString(STORAGE_KEYS.staffCreatedAt),
  ]);

  const normalizedToken = normalizeAuthToken(token);

  if (!normalizedToken || !userData) {
    return null;
  }

  return {
    createdAt: createdAt || userData?.created_at || "",
    id: id || String(userData?.id ?? ""),
    staff: {
      assignedClass: assignedClass || userData?.assignclass || "",
      assignedSection: assignedSection || userData?.assignsection || "",
      email: email || userData?.email || "",
      name: name || userData?.name || "",
      role: role || userData?.role_type || userData?.role || "",
    },
    token: normalizedToken,
    userData,
  };
};

const syncStaffLegacyKeys = async (session) => {
  const { createdAt, id, staff, token, userData } = session;

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.activeAuthRole, AUTH_ROLES.staff],
    [STORAGE_KEYS.token, token],
    [STORAGE_KEYS.legacyToken, token],
    [STORAGE_KEYS.userData, JSON.stringify(userData ?? {})],
    [STORAGE_KEYS.id, String(id || "")],
    [STORAGE_KEYS.name, staff.name],
    [STORAGE_KEYS.email, staff.email],
    [STORAGE_KEYS.role, staff.role],
    [STORAGE_KEYS.aClass, staff.assignedClass],
    [STORAGE_KEYS.aSection, staff.assignedSection],
    [STORAGE_KEYS.date, createdAt || ""],
  ]);
};

export const getPersistedStaffToken = async () => {
  const token = await storage.getString(STORAGE_KEYS.staffJwt);
  return normalizeAuthToken(token);
};

export const getPersistedStaffSession = async () => buildStaffSession();

export const activateStaffSession = async () => {
  const session = await buildStaffSession();

  if (!session) {
    store.dispatch(clearStaffAuth());
    return null;
  }

  await syncStaffLegacyKeys(session);
  store.dispatch(
    setStaffAuth({
      token: session.token,
      userData: session.userData,
    })
  );
  store.dispatch(
    saveUserData({
      token: session.token,
      data: session.userData,
    })
  );

  return session;
};

export const persistStaffSession = async ({ token, userData }) => {
  const normalizedToken = normalizeAuthToken(token);
  const session = {
    createdAt: userData?.created_at ?? "",
    id: String(userData?.id ?? ""),
    staff: {
      assignedClass: userData?.assignclass ?? "",
      assignedSection: userData?.assignsection ?? "",
      email: userData?.email ?? "",
      name: userData?.name ?? "",
      role: userData?.role_type ?? userData?.role ?? "",
    },
    token: normalizedToken,
    userData: userData ?? {},
  };

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.staffJwt, normalizedToken],
    [STORAGE_KEYS.staffUserData, JSON.stringify(session.userData)],
    [STORAGE_KEYS.staffId, session.id],
    [STORAGE_KEYS.staffName, session.staff.name],
    [STORAGE_KEYS.staffEmail, session.staff.email],
    [STORAGE_KEYS.staffRole, session.staff.role],
    [STORAGE_KEYS.staffAssignedClass, session.staff.assignedClass],
    [STORAGE_KEYS.staffAssignedSection, session.staff.assignedSection],
    [STORAGE_KEYS.staffCreatedAt, session.createdAt],
  ]);

  await syncStaffLegacyKeys(session);

  store.dispatch(
    setStaffAuth({
      token: normalizedToken,
      userData: session.userData,
    })
  );
  store.dispatch(
    saveUserData({
      token: normalizedToken,
      data: session.userData,
    })
  );

  return normalizedToken;
};

export const updatePersistedStaffUserData = async (nextUserDataOrUpdater) => {
  const session = await buildStaffSession();

  if (!session?.token || !session?.userData) {
    return null;
  }

  const currentUserData = session.userData ?? {};
  const resolvedUserData =
    typeof nextUserDataOrUpdater === "function"
      ? nextUserDataOrUpdater(currentUserData)
      : nextUserDataOrUpdater;

  if (!resolvedUserData || typeof resolvedUserData !== "object") {
    return session.token;
  }

  await persistStaffSession({
    token: session.token,
    userData: {
      ...currentUserData,
      ...resolvedUserData,
    },
  });

  return session.token;
};

export const clearStaffSession = async () => {
  const activeRole = await storage.getString(STORAGE_KEYS.activeAuthRole);

  await AsyncStorage.multiRemove(STAFF_SESSION_KEYS);

  if (activeRole === AUTH_ROLES.staff) {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.activeAuthRole,
      ...LEGACY_SESSION_KEYS,
    ]);
  }

  store.dispatch(clearStaffAuth());

  if (activeRole === AUTH_ROLES.staff) {
    store.dispatch(clearUserData());
  }
};
