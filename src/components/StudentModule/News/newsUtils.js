import moment from "moment";

import { REMOTE_FILE_BASE_URL } from "../../../constants";
import { apiRequest } from "../../../Utils";

export const NEWS_REFRESH_INTERVAL_MS = 30000;

const IMAGE_KEYS = [
  "link",
  "imageUrl",
  "news_image",
  "image",
  "image_url",
  "news_img",
  "thumbnail",
  "file",
  "news_file",
  "photo",
];

const isTruthyStatus = (value) => {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  return Number(value) !== 0;
};

const toAbsoluteUrl = (value) => {
  const normalized = String(value || "").trim();

  if (!normalized) {
    return "";
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `${REMOTE_FILE_BASE_URL}${normalized.replace(/^\/+/, "")}`;
};

export const resolveNewsImage = (item = {}) => {
  const imageValue = IMAGE_KEYS.map((key) => item?.[key]).find(Boolean);
  return toAbsoluteUrl(imageValue);
};

export const normalizeNewsItem = (item = {}, index = 0) => ({
  createdAt: item?.created_at || item?.createdAt || "",
  date: item?.news_date || item?.date || item?.created_at || item?.createdAt || "",
  description: item?.news_description || item?.description || "",
  id: String(item?.id ?? index),
  imageUrl: resolveNewsImage(item),
  isActive: item?.isActive,
  isPublished: item?.news_status,
  link: item?.link || "",
  raw: item,
  title: item?.news_title || item?.title || "News Update",
});

export const fetchNewsItems = async (requestNews = apiRequest) => {
  const response = await requestNews("viewnews", "POST");
  const items = Array.isArray(response?.data) ? response.data : [];

  return items
    .filter(
      (item) => isTruthyStatus(item?.isActive) && isTruthyStatus(item?.news_status)
    )
    .map((item, index) => normalizeNewsItem(item, index));
};

export const areNewsItemsEqual = (previousItems = [], nextItems = []) => {
  if (previousItems === nextItems) {
    return true;
  }

  if (previousItems.length !== nextItems.length) {
    return false;
  }

  return previousItems.every((item, index) => {
    const nextItem = nextItems[index];

    return (
      item?.id === nextItem?.id &&
      item?.title === nextItem?.title &&
      item?.date === nextItem?.date &&
      item?.description === nextItem?.description &&
      item?.link === nextItem?.link &&
      item?.imageUrl === nextItem?.imageUrl
    );
  });
};

export const formatNewsDate = (value) => {
  if (!value) {
    return "Date not available";
  }

  const parsedDate = moment(value);

  if (!parsedDate.isValid()) {
    return "Date not available";
  }

  return parsedDate.format("DD MMM YYYY");
};
