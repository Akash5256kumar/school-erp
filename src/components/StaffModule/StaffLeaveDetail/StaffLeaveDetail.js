import React, { useCallback, useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import staffApiClient from "../../../api/staffClient";
import { LEAVE_COPY } from "../../../constants/libraryLeaveCopy";
import { createLibraryLeaveTheme } from "../../../constants/libraryLeaveTheme";
import {
  DetailRow,
  ModuleHeader,
  RemarkBox,
  SurfaceCard,
} from "../../common/LibraryLeavePrimitives";

const getStatusLabel = (status) => {
  if (status === 1) {
    return LEAVE_COPY.status.approved;
  }

  if (status === 2) {
    return LEAVE_COPY.status.cancelled;
  }

  return LEAVE_COPY.status.pending;
};

const StaffLeaveDetail = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();
  const theme = createLibraryLeaveTheme({ width, height });
  const [leaveDetail, setLeaveDetail] = useState({
    attachment: "",
    createdAt: "",
    description: "",
    endDate: "",
    leaveType: "",
    remark: "",
    startDate: "",
    status: "",
    subject: "",
    userName: "",
  });

  const leaveDetailApi = useCallback(async (leaveId) => {
    const responseJson = await staffApiClient.post("leavedetail", { id: leaveId });
    const data = responseJson?.data || {};
    const attachment = data?.file
      ? data?.server_ip
        ? `${data.server_ip}/images/leaverelated/${data.file}`
        : `http://139.59.90.236:82/images/leaverelated/${data.file}`
      : "";

    setLeaveDetail({
      attachment,
      createdAt: data?.created_at || "",
      description: data?.description || "",
      endDate: data?.end_date || "",
      leaveType: data?.leave_type || "",
      remark: data?.remark || "",
      startDate: data?.start_date || "",
      status: getStatusLabel(data?.status),
      subject: data?.subject || "",
      userName: data?.userdetail?.name || "",
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadDetail = async () => {
        try {
          const routeId = route?.params?.leaveDetails?.id;
          const storedId = await AsyncStorage.getItem("@new_id");
          const resolvedId = routeId ? String(routeId) : storedId;

          if (resolvedId) {
            await leaveDetailApi(resolvedId);
          }
        } catch (error) {
          console.log(error);
        }
      };

      loadDetail();
    }, [leaveDetailApi, route?.params?.leaveDetails?.id])
  );

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      <ModuleHeader
        onBackPress={() => navigation.goBack()}
        theme={theme}
        title={LEAVE_COPY.detailsTitle}
      />

      <LinearGradient colors={theme.palette.pageGradient} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: theme.spacing.listBottom,
            paddingHorizontal: theme.spacing.screenHorizontal,
            paddingTop: theme.spacing.sectionTop,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              color: theme.palette.primaryBlue,
              fontFamily: theme.fonts.bold,
              fontSize: theme.typography.sectionTitle,
              marginBottom: theme.spacing.sectionGap,
            }}
          >
            {LEAVE_COPY.detailsHeading}
          </Text>

          <SurfaceCard style={{ overflow: "hidden" }} theme={theme}>
            <DetailRow
              label={LEAVE_COPY.fields.leaveType}
              theme={theme}
              value={leaveDetail.leaveType}
            />
            <DetailRow
              label={LEAVE_COPY.fields.userName}
              theme={theme}
              value={leaveDetail.userName}
            />
            <DetailRow
              label={LEAVE_COPY.fields.subject}
              theme={theme}
              value={leaveDetail.subject}
            />
            <DetailRow
              label={LEAVE_COPY.fields.startDate}
              theme={theme}
              value={leaveDetail.startDate}
            />
            <DetailRow
              label={LEAVE_COPY.fields.endDate}
              theme={theme}
              value={leaveDetail.endDate}
            />
            <DetailRow
              label={LEAVE_COPY.fields.description}
              theme={theme}
              value={leaveDetail.description}
            />
            <DetailRow
              label={LEAVE_COPY.fields.status}
              theme={theme}
              value={leaveDetail.status}
            />
            <DetailRow
              label={LEAVE_COPY.fields.createdAt}
              multiline
              theme={theme}
              value={leaveDetail.createdAt}
            />
            <DetailRow
              isLink={Boolean(leaveDetail.attachment)}
              label={LEAVE_COPY.fields.attachment}
              multiline
              onPress={() =>
                leaveDetail.attachment &&
                Linking.openURL(leaveDetail.attachment)
              }
              theme={theme}
              value={leaveDetail.attachment}
            />
            <View
              style={{
                paddingHorizontal: theme.spacing.cardPadding,
                paddingVertical: theme.spacing.formRowVertical,
              }}
            >
              <Text
                style={{
                  color: theme.palette.textStrong,
                  fontFamily: theme.fonts.bold,
                  fontSize: theme.typography.detailLabel,
                }}
              >
                {LEAVE_COPY.fields.remark}
              </Text>
              <View style={{ marginTop: theme.spacing.sectionGap }}>
                <RemarkBox theme={theme} value={leaveDetail.remark} />
              </View>
            </View>
          </SurfaceCard>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default StaffLeaveDetail;
