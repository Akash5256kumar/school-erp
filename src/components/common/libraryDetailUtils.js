const IGNORED_DETAIL_KEYS = new Set([
  "book",
  "issue",
  "id",
  "isactive",
  "isdeleted",
]);

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const shouldFormatAsCurrency = (path = "") => {
  const normalizedPath = String(path || "").toLowerCase();

  return ["price", "fine", "total", "amount"].some((token) =>
    normalizedPath.includes(token)
  );
};

const formatCurrency = (value) => {
  const trimmedValue = String(value || "").trim();

  if (!trimmedValue) {
    return "";
  }

  return trimmedValue.startsWith("₹") ? trimmedValue : `₹ ${trimmedValue}`;
};

const toDisplayValue = (value, path = "") => {
  if (value === undefined || value === null) {
    return "";
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toDisplayValue(item, path))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return "";
  }

  if (shouldFormatAsCurrency(path)) {
    return formatCurrency(normalizedValue);
  }

  return normalizedValue;
};

const titleCase = (text) =>
  text
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const humanizePath = (path) => {
  const nextPath = String(path || "")
    .split(".")
    .filter(Boolean)
    .filter((segment) => !IGNORED_DETAIL_KEYS.has(segment.toLowerCase()));

  const normalizedLabel = titleCase(nextPath.join(" "));

  if (normalizedLabel.toLowerCase() === "fine calc") {
    return "Total";
  }

  return normalizedLabel;
};

const appendDetailRow = (rows, consumedPaths, label, candidates) => {
  const normalizedCandidates = Array.isArray(candidates) ? candidates : [];

  for (const candidate of normalizedCandidates) {
    const displayValue = toDisplayValue(candidate?.value, candidate?.path);

    if (!displayValue) {
      continue;
    }

    normalizedCandidates.forEach((item) => {
      if (item?.path) {
        consumedPaths.add(item.path);
      }
    });

    rows.push({
      label,
      multiline: displayValue.length > 34,
      value: displayValue,
    });

    return;
  }
};

const collectDynamicRows = (value, path, rows, consumedPaths) => {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return;
    }

    if (value.every((item) => !isObject(item))) {
      if (!path || consumedPaths.has(path)) {
        return;
      }

      const displayValue = toDisplayValue(value, path);

      if (displayValue) {
        consumedPaths.add(path);
        rows.push({
          label: humanizePath(path),
          multiline: displayValue.length > 34,
          value: displayValue,
        });
      }

      return;
    }

    value.forEach((item, index) => {
      collectDynamicRows(item, path ? `${path}.${index + 1}` : `${index + 1}`, rows, consumedPaths);
    });
    return;
  }

  if (isObject(value)) {
    Object.entries(value).forEach(([key, nestedValue]) => {
      collectDynamicRows(
        nestedValue,
        path ? `${path}.${key}` : key,
        rows,
        consumedPaths
      );
    });
    return;
  }

  const displayValue = toDisplayValue(value, path);

  if (!path || consumedPaths.has(path) || !displayValue) {
    return;
  }

  consumedPaths.add(path);
  rows.push({
    label: humanizePath(path),
    multiline: displayValue.length > 34,
    value: displayValue,
  });
};

export const buildLibraryBookDetailPayload = (item = {}) => {
  const rows = [];
  const consumedPaths = new Set();

  appendDetailRow(rows, consumedPaths, "Title", [
    { path: "title", value: item?.title },
  ]);
  appendDetailRow(rows, consumedPaths, "Author", [
    { path: "author_name", value: item?.author_name },
  ]);
  appendDetailRow(rows, consumedPaths, "Category", [
    { path: "category_name", value: item?.category_name },
    { path: "category", value: item?.category },
  ]);
  appendDetailRow(rows, consumedPaths, "Publisher", [
    { path: "publisher", value: item?.publisher },
  ]);
  appendDetailRow(rows, consumedPaths, "Edition", [
    { path: "edition", value: item?.edition },
  ]);
  appendDetailRow(rows, consumedPaths, "ISBN", [
    { path: "isbn", value: item?.isbn },
  ]);
  appendDetailRow(rows, consumedPaths, "Accession No", [
    { path: "accession_no", value: item?.accession_no },
    { path: "accession_number", value: item?.accession_number },
  ]);
  appendDetailRow(rows, consumedPaths, "Rack No", [
    { path: "rack_no", value: item?.rack_no },
    { path: "rack_number", value: item?.rack_number },
  ]);
  appendDetailRow(rows, consumedPaths, "Shelf", [
    { path: "shelf_no", value: item?.shelf_no },
    { path: "shelf", value: item?.shelf },
  ]);
  appendDetailRow(rows, consumedPaths, "Price", [
    { path: "price", value: item?.price },
  ]);
  appendDetailRow(rows, consumedPaths, "Quantity", [
    { path: "quantity", value: item?.quantity },
    { path: "total_quantity", value: item?.total_quantity },
  ]);
  appendDetailRow(rows, consumedPaths, "Available", [
    { path: "available_quantity", value: item?.available_quantity },
    { path: "available_books", value: item?.available_books },
  ]);
  appendDetailRow(rows, consumedPaths, "Status", [
    { path: "status", value: item?.status },
  ]);

  return {
    consumedPaths: Array.from(consumedPaths),
    detailHeading: "Details of the Book :",
    detailRows: rows,
    detailTitle: "Book Details",
    rawData: item,
  };
};

export const buildIssuedBookDetailPayload = (item = {}) => {
  const rows = [];
  const consumedPaths = new Set();
  const book = isObject(item?.book) ? item.book : item;
  const issue = isObject(item?.issue) ? item.issue : item;

  appendDetailRow(rows, consumedPaths, "Title", [
    { path: "book.title", value: book?.title },
    { path: "book_title", value: item?.book_title },
    { path: "title", value: item?.title },
  ]);
  appendDetailRow(rows, consumedPaths, "Author", [
    { path: "book.author_name", value: book?.author_name },
    { path: "author_name", value: item?.author_name },
  ]);
  appendDetailRow(rows, consumedPaths, "Issue Date", [
    { path: "issue.issue_date", value: issue?.issue_date },
    { path: "issue_date", value: item?.issue_date },
  ]);
  appendDetailRow(rows, consumedPaths, "Return Date", [
    { path: "issue.return_date", value: issue?.return_date },
    { path: "return_date", value: item?.return_date },
  ]);
  appendDetailRow(rows, consumedPaths, "Fine", [
    { path: "issue.fine", value: issue?.fine },
    { path: "fine", value: item?.fine },
  ]);
  appendDetailRow(rows, consumedPaths, "Total", [
    { path: "issue.fine_calc", value: issue?.fine_calc },
    { path: "fine_calc", value: item?.fine_calc },
    { path: "issue.total", value: issue?.total },
    { path: "total", value: item?.total },
  ]);
  appendDetailRow(rows, consumedPaths, "Accession No", [
    { path: "book.accession_no", value: book?.accession_no },
    { path: "accession_no", value: item?.accession_no },
    { path: "accession_number", value: item?.accession_number },
  ]);
  appendDetailRow(rows, consumedPaths, "Publisher", [
    { path: "book.publisher", value: book?.publisher },
    { path: "publisher", value: item?.publisher },
  ]);

  return {
    consumedPaths: Array.from(
      new Set([
        ...consumedPaths,
        "issue.status",
        "status",
        "issue.fine_calc",
        "fine_calc",
        "issue.id",
        "id",
      ])
    ),
    detailHeading: "Details of the Book :",
    detailRows: rows,
    detailTitle: "Book Details",
    rawData: item,
  };
};

export const buildAdditionalBookDetailRows = (rawData, consumed = []) => {
  const rows = [];
  const consumedPaths = new Set(consumed);

  collectDynamicRows(rawData, "", rows, consumedPaths);

  return rows;
};
