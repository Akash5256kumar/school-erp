import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Loader from "../../Loader";
import { useAppToast } from "../../common/AppToast";
import * as constant from "../../../Utils/Constant";
import { apiRequest, uploadFile } from "../../../Utils";
import usePullToRefresh from "../../../hooks/usePullToRefresh";
import StaffContentScaffold from "../StaffContentShared/StaffContentScaffold";
import {
  StaffContentEmptyState,
  StaffContentFab,
  StaffContentListCard,
} from "../StaffContentShared/StaffContentPrimitives";
import {
  buildHomeworkTitle,
  getPublishDateValue,
  updateStatus,
} from "../StaffContentShared/staffContentHelpers";
import { STAFF_CONTENT_TEXT } from "../StaffContentShared/staffContentConfig";
import createStaffContentTheme from "../StaffContentShared/staffContentTheme";

const MODULE_TEXT = STAFF_CONTENT_TEXT.homework;

const StaffModuleHomeWork = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const { showSuccessToast } = useAppToast();
  const theme = createStaffContentTheme({ height, width, variant: "homework" });
  const userData = useSelector((state) => state.userSlice.userData);
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  const getAssignments = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        }
        const res = await apiRequest(
          `teacher-assignments?staff_id=${userData?.staff_info_id}`,
          "GET"
        );
        setHomeworks(res?.assignments || []);
      } catch (error) {
        console.log("Assignment API Error", error);
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [userData?.staff_info_id]
  );

  useFocusEffect(
    useCallback(() => {
      getAssignments();
    }, [getAssignments])
  );

  const { onRefresh, refreshing } = usePullToRefresh(() =>
    getAssignments(false)
  );

  const onPublish = useCallback(async (item) => {
    if (!item?.id || publishingId === item.id) return;
    try {
      setPublishingId(item.id);
      await updateStatus(item.id, "Assig", 1);
      setHomeworks((prev) =>
        prev.map((hw) => (hw.id === item.id ? { ...hw, isActive: 1 } : hw))
      );
      showSuccessToast({
        message: "The homework is now published successfully.",
        title: "Homework Published",
      });
    } catch (error) {
      console.log("Publish Error:", error);
      constant.showAlert(
        error?.userMessage || "Failed to update status. Please try again."
      );
    } finally {
      setPublishingId(null);
    }
  }, [publishingId, showSuccessToast]);

  const onDelete = useCallback(async (item) => {
    try {
      const res = await uploadFile("CommanStatus", null, {
        id: item.id,
        table: "Assig",
        status: "0",
        type: "delete",
      });

      if (res?.status === 200) {
        setHomeworks((prev) => prev.filter((hw) => hw.id !== item.id));
        showSuccessToast({
          message: "The homework has been deleted successfully.",
          title: "Homework Deleted",
        });
      }
    } catch (error) {
      console.log("Delete Error:", error);
      constant.showAlert(`Homework delete failed: ${error?.message}`);
    }
  }, [showSuccessToast]);

  const listContentStyle = useMemo(
    () => ({
      flexGrow: 1,
      paddingBottom:
        homeworks.length > 0
          ? theme.spacing.listBottom
          : theme.spacing.footerSafeBottom,
      paddingTop: theme.spacing.screenTop,
    }),
    [
      homeworks.length,
      theme.spacing.footerSafeBottom,
      theme.spacing.listBottom,
      theme.spacing.screenTop,
    ]
  );

  return (
    <StaffContentScaffold
      onBackPress={() => navigation.goBack()}
      theme={theme}
      title={MODULE_TEXT.listTitle}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            contentContainerStyle={listContentStyle}
            data={homeworks}
            keyExtractor={(item, index) =>
              `${String(item?.id ?? "homework")}-${index}`
            }
            ListEmptyComponent={
              <StaffContentEmptyState
                actionLabel={MODULE_TEXT.emptyAction}
                description={MODULE_TEXT.emptyDescription}
                onActionPress={() => navigation.navigate("StaffAddHomeWork")}
                theme={theme}
                title={MODULE_TEXT.emptyTitle}
              />
            }
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <StaffContentListCard
                actions={[
                  {
                    disabled: item?.isActive === 1 || publishingId === item.id,
                    label:
                      publishingId === item.id
                        ? "Publishing..."
                        : item?.isActive === 0
                        ? STAFF_CONTENT_TEXT.common.publish
                        : STAFF_CONTENT_TEXT.common.published,
                    onPress: () => onPublish(item),
                    tone: item?.isActive === 0 ? "publish" : "published",
                  },
                  {
                    label: STAFF_CONTENT_TEXT.common.delete,
                    onPress: () => onDelete(item),
                    tone: "delete",
                  },
                ]}
                actionsLayout="below"
                density="compact"
                metaLabel={MODULE_TEXT.labels.dateOfPublish}
                metaValue={getPublishDateValue(item)}
                onPress={() =>
                  navigation.navigate("StaffViewHomeWork", { homeWork: item })
                }
                theme={theme}
                title={buildHomeworkTitle(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
          {homeworks.length > 0 ? (
            <StaffContentFab
              onPress={() => navigation.navigate("StaffAddHomeWork")}
              theme={theme}
            />
          ) : null}
        </>
      )}
    </StaffContentScaffold>
  );
};

export default StaffModuleHomeWork;

const styles = StyleSheet.create({});
