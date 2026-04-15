import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import StaffContentScaffold from '../StaffContentShared/StaffContentScaffold';
import {
  StaffContentDetailCard,
  StaffContentPrimaryButton,
} from '../StaffContentShared/StaffContentPrimitives';
import {
  getClassValue,
  getPublishDateValue,
  getSectionValue,
  getSubjectValue,
  getTopicValue,
} from '../StaffContentShared/staffContentHelpers';
import {STAFF_CONTENT_TEXT} from '../StaffContentShared/staffContentConfig';
import createStaffContentTheme from '../StaffContentShared/staffContentTheme';

const MODULE_TEXT = STAFF_CONTENT_TEXT.notes;

const StaffViewNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'notes'});
  const {notes} = route.params;

  const rows = [
    {label: `${MODULE_TEXT.labels.dateOfPublish}:`, value: getPublishDateValue(notes)},
    {label: `${MODULE_TEXT.labels.subject}:`, value: getSubjectValue(notes)},
    {label: `${MODULE_TEXT.labels.topic}:`, value: getTopicValue(notes)},
    {label: `${MODULE_TEXT.labels.class}:`, value: getClassValue(notes)},
    {label: `${MODULE_TEXT.labels.section}:`, value: getSectionValue(notes)},
    {label: `${MODULE_TEXT.labels.fromDate}:`, value: getPublishDateValue(notes)},
  ];

  return (
    <StaffContentScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.viewTitle}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: theme.spacing.footerSafeBottom,
          paddingTop: theme.spacing.screenTop,
        }}
        showsVerticalScrollIndicator={false}>
        <StaffContentDetailCard rows={rows} theme={theme} />
        <StaffContentPrimaryButton
          onPress={() => navigation.navigate('StaffEditNotes', {notes})}
          style={{
            marginTop: theme.spacing.buttonTop,
          }}
          theme={theme}
          title={STAFF_CONTENT_TEXT.common.edit}
        />
      </ScrollView>
    </StaffContentScaffold>
  );
};

export default StaffViewNotes;
