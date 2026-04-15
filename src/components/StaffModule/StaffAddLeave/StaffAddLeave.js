import React, { useEffect, useState } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import DatePicker from "react-native-date-picker";
import Snackbar from "react-native-snackbar";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import moment from "moment";

import { colors } from "../../../constants";
import { LEAVE_COPY } from "../../../constants/libraryLeaveCopy";
import { createLibraryLeaveTheme } from "../../../constants/libraryLeaveTheme";
import getErrorMessage from "../../../Utils/errorMessages";
import { uploadFile } from "../../../Utils";
import { useAppToast } from "../../common/AppToast";
import CommonButton from "../../Button/CommonButton";
import { CustomDropdown } from "../../CommonDropDown/CommonDropDownList";
import {
  AttachmentPreview,
  FormRow,
  FormTextInput,
  ModuleHeader,
  OptionSheet,
  SurfaceCard,
} from "../../common/LibraryLeavePrimitives";

const StaffAddLeave = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const theme = createLibraryLeaveTheme({ width, height });
  const { showSuccessToast } = useAppToast();
  const [userId, setUserId] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFilePickerVisible, setFilePickerVisible] = useState(false);
  const [isStartDateVisible, setStartDateVisible] = useState(false);
  const [isEndDateVisible, setEndDateVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = await AsyncStorage.getItem("@id");
      setUserId(storedUserId || "");
    };

    loadUser();
  }, []);

  const showMessage = (message) => {
    Snackbar.show({
      backgroundColor: colors.danger,
      duration: Snackbar.LENGTH_SHORT,
      text: message,
    });
  };

  const validateForm = () => {
    if (!selectedValue) {
      return LEAVE_COPY.validation.leaveType;
    }

    if (!startDate) {
      return LEAVE_COPY.validation.startDate;
    }

    if (!endDate) {
      return LEAVE_COPY.validation.endDate;
    }

    if (!subject.trim()) {
      return LEAVE_COPY.validation.subject;
    }

    if (!description.trim()) {
      return LEAVE_COPY.validation.description;
    }

    return "";
  };

  const getValidationMessage = (error) => {
    const firstFieldError = Object.values(error?.data?.errors || {}).find(
      (messages) => Array.isArray(messages) && messages.length
    );

    return (
      firstFieldError?.[0] ||
      error?.data?.message ||
      error?.message ||
      getErrorMessage(error)
    );
  };

  const handleSubmit = async () => {
    const validationMessage = validateForm();

    if (validationMessage) {
      showMessage(validationMessage);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        description: description.trim(),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        leave_type: selectedValue,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        subject: subject.trim(),
        user_id: userId,
      };
      const attachment = uri
        ? {
            name: fileName || "leave_attachment.jpg",
            type: fileType || "image/jpeg",
            uri,
          }
        : null;
      const responseJson = await uploadFile(
        "applyleave",
        attachment,
        payload,
        "file"
      );

      if (responseJson?.status) {
        showSuccessToast({
          message: responseJson?.message || "Your leave request has been submitted successfully.",
          title: "Leave Applied",
        });
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "StaffModuleBottomTabs",
              params: {
                screen: "Grade",
              },
            },
          ],
        });
      } else {
        showMessage(responseJson?.message || "Unable to apply leave.");
      }
    } catch (error) {
      console.log("Apply leave error", error);
      showMessage(getValidationMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const selectFile = async (type) => {
    const options = {
      cameraType: "back",
      includeBase64: false,
      maxHeight: 0,
      maxWidth: 0,
      mediaType: "photo",
      quality: 1,
      saveToPhotos: false,
      selectionLimit: 1,
      videoQuality: "high",
    };

    try {
      const response =
        type === "Camera"
          ? await launchCamera(options)
          : await launchImageLibrary(options);

      if (response?.didCancel || !response?.assets?.length) {
        return;
      }

      const selectedAsset = response.assets[0];
      setFileName(selectedAsset?.fileName || "");
      setFileType(selectedAsset?.type || "");
      setUri(selectedAsset?.uri || "");
    } catch (error) {
      console.log(error);
    } finally {
      setFilePickerVisible(false);
    }
  };

  const fileOptions = [
    { label: LEAVE_COPY.picker.camera, value: "Camera" },
    { label: LEAVE_COPY.picker.gallery, value: "Gallery" },
  ];

  const formattedStartDate = moment(startDate).format("ddd MMMM DD HH:mm");
  const formattedEndDate = moment(endDate).format("ddd MMMM DD HH:mm");

  return (
    <View style={{ backgroundColor: theme.palette.pageBase, flex: 1 }}>
      <ModuleHeader
        onBackPress={() => navigation.goBack()}
        theme={theme}
        title={LEAVE_COPY.addTitle}
      />

      <LinearGradient colors={theme.palette.pageGradient} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: theme.spacing.leaveFormButtonBottom,
            paddingHorizontal: theme.spacing.screenHorizontal,
            paddingTop: theme.spacing.leaveFormTop,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SurfaceCard theme={theme}>
            <FormRow
              icon="calendar"
              label={LEAVE_COPY.fields.type}
              theme={theme}
            >
              <CustomDropdown
                data={LEAVE_COPY.form.options}
                onSelect={(value) => {
                  setSelectedValue(value);
                }}
                placeholder={LEAVE_COPY.form.leaveTypePlaceholder}
                selected={selectedValue}
              />
            </FormRow>

            <FormRow
              icon="subject"
              label={LEAVE_COPY.fields.subject}
              theme={theme}
            >
              <FormTextInput
                onChangeText={setSubject}
                placeholder={LEAVE_COPY.form.subjectPlaceholder}
                theme={theme}
                value={subject}
              />
            </FormRow>

            <FormRow
              icon="arrow"
              label={LEAVE_COPY.fields.from}
              onPress={() => setStartDateVisible(true)}
              theme={theme}
              value={formattedStartDate}
            />

            <FormRow
              icon="arrow"
              label={LEAVE_COPY.fields.to}
              onPress={() => setEndDateVisible(true)}
              theme={theme}
              value={formattedEndDate}
            />

            <FormRow
              icon="description"
              label={LEAVE_COPY.fields.description}
              theme={theme}
            >
              <FormTextInput
                multiline
                onChangeText={setDescription}
                placeholder={LEAVE_COPY.form.descriptionPlaceholder}
                theme={theme}
                value={description}
              />
            </FormRow>

            <FormRow
              icon="attachment"
              label={LEAVE_COPY.fields.attachFile}
              showDivider={false}
              theme={theme}
            >
              <AttachmentPreview
                onPress={() => setFilePickerVisible(true)}
                theme={theme}
                uri={uri}
              />
            </FormRow>
          </SurfaceCard>

          <View
            style={{
              marginBottom: theme.spacing.leaveFormButtonBottom,
              marginTop: theme.spacing.leaveFormButtonTop,
            }}
          >
            <CommonButton
              buttonClick={handleSubmit}
              disabled={loading}
              extStyle={{
                minHeight: theme.sizes.primaryButtonHeight,
              }}
              isLoading={loading}
              title={LEAVE_COPY.form.applyAction}
            />
          </View>
        </ScrollView>
      </LinearGradient>

      <OptionSheet
        onClose={() => setFilePickerVisible(false)}
        onSelect={selectFile}
        options={fileOptions}
        theme={theme}
        title={LEAVE_COPY.fields.attachFile}
        visible={isFilePickerVisible}
      />

      <DatePicker
        date={startDate}
        minimumDate={new Date()}
        modal
        mode="datetime"
        onCancel={() => setStartDateVisible(false)}
        onConfirm={(date) => {
          setStartDate(date);
          setStartDateVisible(false);
        }}
        open={isStartDateVisible}
      />

      <DatePicker
        date={endDate}
        minimumDate={startDate}
        modal
        mode="datetime"
        onCancel={() => setEndDateVisible(false)}
        onConfirm={(date) => {
          setEndDate(date);
          setEndDateVisible(false);
        }}
        open={isEndDateVisible}
      />
    </View>
  );
};

export default StaffAddLeave;
