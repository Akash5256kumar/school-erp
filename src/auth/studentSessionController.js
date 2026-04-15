import AsyncStorage from "@react-native-community/async-storage";

import { STORAGE_KEYS } from "../constants";
import store from "../store";
import {
  clearUserData,
  saveUserData,
} from "../store/slices/userSlice";
import {
  clearStudentAuth,
  setStudentAuth,
} from "../store/slices/studentAuthSlice";
import { AUTH_ROLES } from "./roles";
import { storage } from "./sessionStorage";
import { normalizeAuthToken } from "./tokenUtils";

const STUDENT_SESSION_KEYS = [
  STORAGE_KEYS.studentId,
  STORAGE_KEYS.studentJwt,
  STORAGE_KEYS.studentUserData,
  STORAGE_KEYS.studentClass,
  STORAGE_KEYS.studentSection,
  STORAGE_KEYS.studentName,
  STORAGE_KEYS.studentRoll,
  STORAGE_KEYS.studentDate,
  STORAGE_KEYS.studentTime,
];

const LEGACY_SESSION_KEYS = [
  STORAGE_KEYS.token,
  STORAGE_KEYS.legacyToken,
  STORAGE_KEYS.userData,
  STORAGE_KEYS.id,
  STORAGE_KEYS.name,
  STORAGE_KEYS.class,
  STORAGE_KEYS.section,
  STORAGE_KEYS.stdRoll,
  STORAGE_KEYS.date,
  STORAGE_KEYS.time,
];

const buildStudentSession = async () => {
  const [token, userData, id, studentClass, section, name, stdRoll, date, time] =
    await Promise.all([
      storage.getString(STORAGE_KEYS.studentJwt),
      storage.getJSON(STORAGE_KEYS.studentUserData),
      storage.getString(STORAGE_KEYS.studentId),
      storage.getString(STORAGE_KEYS.studentClass),
      storage.getString(STORAGE_KEYS.studentSection),
      storage.getString(STORAGE_KEYS.studentName),
      storage.getString(STORAGE_KEYS.studentRoll),
      storage.getString(STORAGE_KEYS.studentDate),
      storage.getString(STORAGE_KEYS.studentTime),
    ]);

  const normalizedToken = normalizeAuthToken(token);

  if (!normalizedToken || !userData) {
    return null;
  }

  return {
    date: date || "",
    id: id || String(userData?.id ?? ""),
    time: time || "",
    token: normalizedToken,
    userData,
    student: {
      class: studentClass || userData?.Student_class || "",
      name: name || userData?.Student_name || "",
      roll: stdRoll || userData?.std_roll || "",
      section: section || userData?.Student_section || "",
    },
  };
};

const syncStudentLegacyKeys = async (session) => {
  const { student, token, userData, id, date, time } = session;

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.activeAuthRole, AUTH_ROLES.student],
    [STORAGE_KEYS.token, token],
    [STORAGE_KEYS.legacyToken, token],
    [STORAGE_KEYS.userData, JSON.stringify(userData ?? {})],
    [STORAGE_KEYS.id, String(id || "")],
    [STORAGE_KEYS.name, student.name],
    [STORAGE_KEYS.class, student.class],
    [STORAGE_KEYS.section, student.section],
    [STORAGE_KEYS.stdRoll, student.roll],
    [STORAGE_KEYS.date, date || ""],
    [STORAGE_KEYS.time, time || ""],
  ]);
};

export const getPersistedStudentToken = async () => {
  const token = await storage.getString(STORAGE_KEYS.studentJwt);
  return normalizeAuthToken(token);
};

export const getPersistedStudentSession = async () => buildStudentSession();

export const activateStudentSession = async () => {
  const session = await buildStudentSession();

  if (!session) {
    store.dispatch(clearStudentAuth());
    return null;
  }

  await syncStudentLegacyKeys(session);
  store.dispatch(
    setStudentAuth({
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

export const persistStudentSession = async ({
  token,
  userData,
  date,
  time,
}) => {
  const normalizedToken = normalizeAuthToken(token);
  const session = {
    date: date || "",
    id: String(userData?.id ?? ""),
    time: time || "",
    token: normalizedToken,
    userData: userData ?? {},
    student: {
      class: userData?.Student_class ?? "",
      name: userData?.Student_name ?? "",
      roll: userData?.std_roll ?? "",
      section: userData?.Student_section ?? "",
    },
  };

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.studentJwt, normalizedToken],
    [STORAGE_KEYS.studentUserData, JSON.stringify(session.userData)],
    [STORAGE_KEYS.studentId, session.id],
    [STORAGE_KEYS.studentClass, session.student.class],
    [STORAGE_KEYS.studentSection, session.student.section],
    [STORAGE_KEYS.studentName, session.student.name],
    [STORAGE_KEYS.studentRoll, session.student.roll],
    [STORAGE_KEYS.studentDate, session.date],
    [STORAGE_KEYS.studentTime, session.time],
  ]);

  await syncStudentLegacyKeys(session);

  store.dispatch(
    setStudentAuth({
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

export const clearStudentSession = async () => {
  const activeRole = await storage.getString(STORAGE_KEYS.activeAuthRole);

  await AsyncStorage.multiRemove(STUDENT_SESSION_KEYS);

  if (activeRole === AUTH_ROLES.student) {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.activeAuthRole,
      ...LEGACY_SESSION_KEYS,
    ]);
  }

  store.dispatch(clearStudentAuth());

  if (activeRole === AUTH_ROLES.student) {
    store.dispatch(clearUserData());
  }
};
