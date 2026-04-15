import React, { useCallback, useMemo, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Loader from "../../Loader";
import { useAppToast } from "../../common/AppToast";
import * as constant from "../../../Utils/Constant";
import { apiRequest, uploadFile } from "../../../Utils";
import StaffContentScaffold from "../StaffContentShared/StaffContentScaffold";
import {
  StaffContentEmptyState,
  StaffContentFab,
  StaffContentListCard,
} from "../StaffContentShared/StaffContentPrimitives";
import {
  buildPlannerTitle,
  updateStatus,
} from "../StaffContentShared/staffContentHelpers";
import { STAFF_CONTENT_TEXT } from "../StaffContentShared/staffContentConfig";
import createStaffContentTheme from "../StaffContentShared/staffContentTheme";

const MODULE_TEXT = STAFF_CONTENT_TEXT.planner;

const StaffModuleFornightlyPlanner = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const { showSuccessToast } = useAppToast();
  const theme = createStaffContentTheme({ height, width, variant: "planner" });
  const userData = useSelector((state) => state.userSlice.userData);
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  const getFortnightlyPlanner = useCallback(async () => {
    if (!userData?.staff_info_id) {
      setPlanners([]);
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest(
        `teacher-fortnightly-planner?teacher_id=${userData?.staff_info_id}`,
        "GET"
      );

      if (res?.status) {
        setPlanners(res?.fortnightly_planners?.flat() || []);
      }
    } catch (error) {
      console.log("Planner API Error", error);
    } finally {
      setLoading(false);
    }
  }, [userData?.staff_info_id]);

  useFocusEffect(
    useCallback(() => {
      getFortnightlyPlanner();
    }, [getFortnightlyPlanner])
  );

  const onPublish = useCallback(async (item) => {
    if (!item?.id || publishingId === item.id) return;
    try {
      setPublishingId(item.id);
      await updateStatus(item.id, "Fortnightly", 1);
      setPlanners((prev) =>
        prev.map((planner) =>
          planner.id === item.id ? { ...planner, isActive: 1 } : planner
        )
      );
      showSuccessToast({
        message: "The planner is now published successfully.",
        title: "Planner Published",
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
      await updateStatus(item.id, "Fortnightly", 0, "delete");
      setPlanners((prev) => prev.filter((planner) => planner.id !== item.id));
      showSuccessToast({
        message: "The planner has been deleted successfully.",
        title: "Planner Deleted",
      });
    } catch (error) {
      console.log("Delete Error:", error);
      constant.showAlert(
        error?.userMessage || "Failed to delete. Please try again."
      );
    }
  }, [showSuccessToast]);

  const contentStyle = useMemo(
    () => ({
      flexGrow: 1,
      paddingBottom: theme.spacing.listBottom,
      paddingTop: theme.spacing.screenTop,
    }),
    [theme.spacing.listBottom, theme.spacing.screenTop]
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
            contentContainerStyle={contentStyle}
            data={planners}
            keyExtractor={(item, index) =>
              `${String(item?.id ?? "planner")}-${index}`
            }
            ListEmptyComponent={
              <StaffContentEmptyState
                actionLabel={MODULE_TEXT.emptyAction}
                description={MODULE_TEXT.emptyDescription}
                onActionPress={() => navigation.navigate("StaffAddPlanner")}
                theme={theme}
                title={MODULE_TEXT.emptyTitle}
              />
            }
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
                metaLabel={MODULE_TEXT.labels.dateOfPublish}
                metaValue={`${item.from_date} - ${item.to_date}`}
                onPress={() =>
                  navigation.navigate("ViewStaffFornightlyPlanner", {
                    planner: item,
                  })
                }
                theme={theme}
                title={buildPlannerTitle(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
          {planners.length > 0 ? (
            <StaffContentFab
              onPress={() => navigation.navigate("StaffAddPlanner")}
              theme={theme}
            />
          ) : null}
        </>
      )}
    </StaffContentScaffold>
  );
};

export default StaffModuleFornightlyPlanner;
