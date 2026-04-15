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
  getSectionValue,
  getSubjectValue,
} from '../StaffContentShared/staffContentHelpers';
import {STAFF_CONTENT_TEXT} from '../StaffContentShared/staffContentConfig';
import createStaffContentTheme from '../StaffContentShared/staffContentTheme';

const MODULE_TEXT = STAFF_CONTENT_TEXT.planner;

const ViewStaffFornightlyPlanner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {height, width} = useWindowDimensions();
  const theme = createStaffContentTheme({height, width, variant: 'planner'});
  const {planner} = route.params;

  const rows = [
    {label: `${MODULE_TEXT.labels.subject}:`, value: getSubjectValue(planner)},
    {label: `${MODULE_TEXT.labels.class}:`, value: getClassValue(planner)},
    {label: `${MODULE_TEXT.labels.section}:`, value: getSectionValue(planner)},
    {label: `${MODULE_TEXT.labels.fromDate}:`, value: planner.from_date || 'NA'},
    {label: `${MODULE_TEXT.labels.toDate}:`, value: planner.to_date || 'NA'},
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
          onPress={() =>
            navigation.navigate('StaffEditFornightlyPlanner', {planner})
          }
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

export default ViewStaffFornightlyPlanner;
