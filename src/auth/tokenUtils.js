export const normalizeAuthToken = (token) => {
  if (!token) {
    return "";
  }

  const value = String(token).trim();
  return value.startsWith("Bearer ") ? value : `Bearer ${value}`;
};

export const stripBearerPrefix = (token) =>
  String(token || "").replace(/^Bearer\s+/i, "").trim();
