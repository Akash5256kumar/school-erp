import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import useStudentAuth from '../../../store/hooks/useStudentAuth';

import * as myConst from "../../Baseurl";
import StudentDocumentList from "../Shared/StudentDocumentList";

const Multimedia = ({ navigation }) => {
  const { token: usertoken } = useStudentAuth();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classValue = await AsyncStorage.getItem("@class");
      const sectionValue = await AsyncStorage.getItem("@section");

      setClasses(classValue || "");
      setSection(sectionValue || "");
    };

    fetchData();
  }, []);

  const loadMultimedia = useCallback(
    async (showLoader = true) => {
      if (!classes || !section) {
        setDataSource([]);
        return;
      }

      if (showLoader) setLoading(true);

      const formData = new FormData();
      formData.append("std_class", classes);
      formData.append("std_section", section);

      try {
        const response = await fetch(myConst.BASEURL + "viewvideo", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: usertoken,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });
        const responseJson = await response.json();
        setDataSource(responseJson?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [classes, section, usertoken]
  );

  useEffect(() => {
    if (classes && section) {
      loadMultimedia();
    }
  }, [classes, loadMultimedia, section]);

  const handleCardPress = (item) => {
    navigation.navigate("Video", {
      otherParam: item.videouri,
    });
  };

  const renderCard = useCallback((item) => ({
    title: item.chapter || "Untitled",
    date: item.topic || "Unknown Topic",
    emoji: "▶️",
  }), []);

  return (
    <View style={{ flex: 1 }}>
      <StudentDocumentList
        title="Multimedia"
        items={dataSource}
        renderCard={renderCard}
        onBack={() => navigation.goBack()}
        onCardPress={handleCardPress}
        searchFields={['chapter', 'topic']}
        emptyMessage="No multimedia available right now."
        headerEmoji="🎬"
      />
    </View>
  );
};

export default Multimedia;
