import React, { useCallback, useMemo, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Loader from "../../Loader";
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
  buildNotesTitle,
  getPublishDateValue,
  updateStatus,
} from "../StaffContentShared/staffContentHelpers";
import { STAFF_CONTENT_TEXT } from "../StaffContentShared/staffContentConfig";
import createStaffContentTheme from "../StaffContentShared/staffContentTheme";

const MODULE_TEXT = STAFF_CONTENT_TEXT.notes;

const StaffModuleNotes = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.userSlice.userData);
  const { height, width } = useWindowDimensions();
  const theme = createStaffContentTheme({ height, width, variant: "notes" });
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishingId, setPublishingId] = useState(null);

  const getNotes = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        }
        const res = await apiRequest(
          `teacher-notes?staff_id=${userData?.staff_info_id}`,
          "GET"
        );

        if (res?.status) {
          setNotes(res?.notes?.flat() || []);
        }
      } catch (error) {
        console.log("Notes API Error", error);
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
      getNotes();
    }, [getNotes])
  );

  const { onRefresh, refreshing } = usePullToRefresh(() => getNotes(false));

  const onPublish = useCallback(async (item) => {
    if (!item?.id || publishingId === item.id) return;
    try {
      setPublishingId(item.id);
      await updateStatus(item.id, "Notes", 1);
      setNotes((prev) =>
        prev.map((note) =>
          note.id === item.id ? { ...note, isActive: 1 } : note
        )
      );
      constant.showAlert("Published successfully");
    } catch (error) {
      console.log("Publish Error:", error);
      constant.showAlert(
        error?.userMessage || "Failed to update status. Please try again."
      );
    } finally {
      setPublishingId(null);
    }
  }, [publishingId]);

  const onDelete = useCallback(async (item) => {
    try {
      setLoading(true);
      await updateStatus(item.id, "Notes", 0, "delete");
      setNotes((prev) => prev.filter((note) => note.id !== item.id));
      constant.showAlert("Note deleted successfully");
    } catch (error) {
      console.log("Delete Error:", error);
      constant.showAlert(
        error?.userMessage || "Failed to delete. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

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
            data={notes}
            keyExtractor={(item, index) =>
              `${String(item?.id ?? "note")}-${index}`
            }
            ListEmptyComponent={
              <StaffContentEmptyState
                actionLabel={MODULE_TEXT.emptyAction}
                description={MODULE_TEXT.emptyDescription}
                onActionPress={() => navigation.navigate("StaffAddNotes")}
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
                metaLabel={MODULE_TEXT.labels.dateOfPublish}
                metaValue={getPublishDateValue(item)}
                onPress={() =>
                  navigation.navigate("StaffViewNotes", { notes: item })
                }
                theme={theme}
                title={buildNotesTitle(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
          {notes.length > 0 ? (
            <StaffContentFab
              onPress={() => navigation.navigate("StaffAddNotes")}
              theme={theme}
            />
          ) : null}
        </>
      )}
    </StaffContentScaffold>
  );
};

export default StaffModuleNotes;
