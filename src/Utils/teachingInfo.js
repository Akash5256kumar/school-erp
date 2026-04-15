import {apiRequest} from "./index";
import {
  getPersistedAuthToken,
  updatePersistedStaffUserData,
} from "./authSession";

const ROMAN_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const normalizeValue = value => String(value || "").trim();

const getNormalizedTeachingInfo = teachingInfo => {
  const seenAssignments = new Set();

  return (teachingInfo || []).filter(item => {
    const className = normalizeValue(item?.class);
    const sectionName = normalizeValue(item?.section);

    if (!className || !sectionName) {
      return false;
    }

    const assignmentKey =
      normalizeValue(item?.id) ||
      [
        className,
        sectionName,
        normalizeValue(item?.subject || item?.name),
        normalizeValue(
          item?.teacher || item?.teacher_name || item?.staff_name,
        ),
      ].join("__");

    if (seenAssignments.has(assignmentKey)) {
      return false;
    }

    seenAssignments.add(assignmentKey);
    return true;
  });
};

/**
 * Attendance-only filter: keeps only classes where the teacher is the
 * designated class teacher (classteacher === "1"). Must be applied AFTER
 * getNormalizedTeachingInfo, and ONLY inside attendance components.
 */
export const filterAttendanceTeachingInfo = teachingInfo =>
  (teachingInfo || []).filter(
    item => normalizeValue(item?.classteacher) === "1",
  );

const syncTeachingInfoCache = async teachingInfo => {
  try {
    await updatePersistedStaffUserData({
      teaching_info: teachingInfo,
    });
  } catch (error) {
    // Teaching-info cache sync should never block the latest API response.
  }
};

export const extractTeachingInfo = response =>
  getNormalizedTeachingInfo(
    Array.isArray(response?.teaching_info)
      ? response.teaching_info
      : Array.isArray(response?.data?.teaching_info)
        ? response.data.teaching_info
        : [],
  );

const parseRomanNumeral = value => {
  const normalized = normalizeValue(value).toUpperCase();

  if (!normalized || /[^IVXLCDM]/.test(normalized)) {
    return null;
  }

  let total = 0;

  for (let index = 0; index < normalized.length; index += 1) {
    const current = ROMAN_VALUES[normalized[index]];
    const next = ROMAN_VALUES[normalized[index + 1]] || 0;

    total += current < next ? -current : current;
  }

  return total || null;
};

export const sortTeachingClasses = values =>
  [...values].sort((left, right) => {
    const leftValue = normalizeValue(left);
    const rightValue = normalizeValue(right);
    const leftRoman = parseRomanNumeral(leftValue);
    const rightRoman = parseRomanNumeral(rightValue);

    if (leftRoman !== null && rightRoman !== null) {
      return leftRoman - rightRoman;
    }

    const leftNumber = Number(leftValue);
    const rightNumber = Number(rightValue);
    const leftIsNumber = !Number.isNaN(leftNumber);
    const rightIsNumber = !Number.isNaN(rightNumber);

    if (leftIsNumber && rightIsNumber) {
      return leftNumber - rightNumber;
    }

    return leftValue.localeCompare(rightValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

export const sortTeachingValues = values =>
  [...values].sort((left, right) =>
    normalizeValue(left).localeCompare(normalizeValue(right), undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

export const buildClassSectionMap = teachingInfo => {
  const map = {};

  (teachingInfo || []).forEach(item => {
    const className = normalizeValue(item?.class);
    const sectionName = normalizeValue(item?.section);

    if (!className || !sectionName) {
      return;
    }

    if (!map[className]) {
      map[className] = new Set();
    }

    map[className].add(sectionName);
  });

  return Object.fromEntries(
    Object.entries(map).map(([className, sections]) => [
      className,
      sortTeachingValues([...sections]),
    ]),
  );
};

export const getTeachingInfoClassOptions = classSectionMap =>
  sortTeachingClasses(Object.keys(classSectionMap || {}));

export const getTeachingSectionsForClass = (classSectionMap, className) =>
  className ? classSectionMap?.[className] || [] : [];

export const fetchTeachingInfo = async () => {
  const authToken = await getPersistedAuthToken();
  const rawToken = normalizeValue(authToken).replace(/^Bearer\s+/i, "");

  if (!rawToken) {
    return [];
  }

  const response = await apiRequest(
    `get-teaching-info?token=${encodeURIComponent(rawToken)}`,
    "POST",
  );

  const teachingInfo = extractTeachingInfo(response);
  await syncTeachingInfoCache(teachingInfo);

  return teachingInfo;
};

export const fetchStaffProfileTeachingInfo = async staffInfoId => {
  const normalizedStaffInfoId = normalizeValue(staffInfoId);

  if (!normalizedStaffInfoId) {
    return [];
  }

  const response = await apiRequest(
    `staff_profile?staff_info_id=${encodeURIComponent(normalizedStaffInfoId)}`,
    "GET",
  );
  const teachingInfo = extractTeachingInfo(response);
  await syncTeachingInfoCache(teachingInfo);

  return teachingInfo;
};
