import {uploadFile} from '../../../Utils';

/**
 * Reusable status updater for CommanStatus API.
 * @param {string|number} id   - Item id
 * @param {'Assig'|'Notes'|'Fortnightly'} table - Module table name
 * @param {0|1} status         - 1 = Publish, 0 = Delete
 * @param {'status'|'delete'} type
 */
export const updateStatus = (id, table, status, type = 'status') =>
  uploadFile('CommanStatus', null, {
    id: String(id),
    table,
    status: String(status),
    type,
  });

export const getSectionValue = item =>
  item?.section || item?.std_section || item?.Section || 'NA';

export const getClassValue = item => item?.std_class || item?.class || 'NA';

export const getTopicValue = item => item?.topic || 'NA';

export const getSubjectValue = item => item?.subject || 'NA';

export const getPublishDateValue = item =>
  item?.as_date || item?.date_of_publish || 'NA';

export const buildHomeworkTitle = item =>
  `Subject ${getSubjectValue(item)}, Topic ${getTopicValue(item)}, Class ${getClassValue(
    item,
  )}, Section ${getSectionValue(item)}`;

export const buildNotesTitle = item =>
  `Subject ${getSubjectValue(item)}, Topic ${getTopicValue(item)}, Class ${getClassValue(
    item,
  )}, Section ${getSectionValue(item)}`;

export const buildPlannerTitle = item =>
  `${getSubjectValue(item)} - Class ${getClassValue(item)}, Section ${getSectionValue(
    item,
  )}`;
