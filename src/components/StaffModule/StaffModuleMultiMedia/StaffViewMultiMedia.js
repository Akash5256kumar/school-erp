import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

import StaffAcademicScaffold from "../StaffAcademicShared/StaffAcademicScaffold";
import { AcademicGradientButton, AcademicSurfaceCard } from "../StaffAcademicShared/StaffAcademicPrimitives";
import createAcademicTheme from "../StaffAcademicShared/staffAcademicTheme";
import { typeSemiBold, typeRegular } from "../../../Utils/Constant";

const StaffViewMultiMedia = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { media } = route.params;
  const { height, width } = useWindowDimensions();
  const theme = createAcademicTheme({ height, width, variant: "multimedia" });
  const styles = useMemo(() => createStyles(theme), [theme]);

  const rows = [
    { label: "Date", value: media.date },
    { label: "Subject", value: media.subject },
    { label: "Topic", value: media.topic },
    { label: "Class", value: media.std_class },
    { label: "Section", value: media.section },
    { label: "Teacher", value: media.teachername || "—" },
  ];

  return (
    <StaffAcademicScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title="Multimedia Detail">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <AcademicSurfaceCard theme={theme}>
          {rows.map((row, index) => (
            <View key={row.label}>
              <View style={styles.row}>
                <Text style={styles.label}>{row.label}</Text>
                <Text style={styles.value}>{row.value || "—"}</Text>
              </View>
              {index < rows.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.colors.subtleDivider }]} />
              )}
            </View>
          ))}
        </AcademicSurfaceCard>

        <AcademicGradientButton
          onPress={() => navigation.navigate("StaffEditMultiMedia", { media })}
          style={styles.button}
          theme={theme}
          title="Edit"
        />
      </ScrollView>
    </StaffAcademicScaffold>
  );
};

export default StaffViewMultiMedia;

const createStyles = (theme) =>
  StyleSheet.create({
    button: {
      marginTop: theme.spacing.buttonTop,
    },
    container: {
      paddingBottom: theme.spacing.footerBottom * 3,
      paddingTop: theme.spacing.contentTop,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
    },
    label: {
      color: theme.colors.primaryText,
      fontFamily: typeSemiBold,
      fontSize: theme.typography.metaLabel.fontSize,
      flex: 1,
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      paddingVertical: theme.spacing.labelGap * 1.2,
    },
    value: {
      color: theme.colors.secondaryText,
      fontFamily: typeRegular,
      fontSize: theme.typography.metaValue.fontSize,
      flex: 1,
      textAlign: "right",
    },
  });
