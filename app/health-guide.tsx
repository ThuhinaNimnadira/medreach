import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { WebView } from "react-native-webview";

export default function HealthGuideScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [search, setSearch] = useState("");
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Offline PDFs stored in assets/pdfs
  const healthGuides = [
    // First Aid
    {
      id: "1",
      title: "First Aid Basics",
      topic: "First Aid",
      language: "English",
      file: require("../assets/pdfs/firstAid.pdf"),
    },
    {
      id: "2",
      title: "මුලික ප්‍රථම සලකුණු",
      topic: "First Aid",
      language: "Sinhala",
      file: require("../assets/pdfs/firstAid.pdf"),
    },
    {
      id: "3",
      title: "முதல் உதவி அடிப்படை",
      topic: "First Aid",
      language: "Tamil",
      file: require("../assets/pdfs/firstAid.pdf"),
    },

    // Diabetes
    {
      id: "4",
      title: "Diabetes Care",
      topic: "Diabetes",
      language: "English",
      file: require("../assets/pdfs/diabetes.pdf"),
    },
    {
      id: "5",
      title: "හදිසි දියවැඩියා තත්ව",
      topic: "Diabetes",
      language: "Sinhala",
      file: require("../assets/pdfs/sini.pdf"),
    },
    {
      id: "6",
      title: "நீரிழிவு பராமரிப்பு",
      topic: "Diabetes",
      language: "Tamil",
      file: require("../assets/pdfs/diabetes.pdf"),
    },

    // Heart Attack
    {
      id: "7",
      title: "Cardiac Emergency",
      topic: "Heart Attack",
      language: "English",
      file: require("../assets/pdfs/heartAttack.pdf"),
    },
    {
      id: "8",
      title: "හෘදයාබාධ හදිසි තත්ත්වය",
      topic: "Heart Attack",
      language: "Sinhala",
      file: require("../assets/pdfs/heartAttack.pdf"),
    },
    {
      id: "9",
      title: "இதயக்குழற்சி அவசரம்",
      topic: "Heart Attack",
      language: "Tamil",
      file: require("../assets/pdfs/heartAttack.pdf"),
    },
  ];

  // Filter by language + search
  const filteredFiles = healthGuides.filter((file) => {
    const matchesLanguage = file.language === selectedLanguage;
    const text = search.toLowerCase();
    const matchesSearch =
      file.title.toLowerCase().includes(text) ||
      file.topic.toLowerCase().includes(text);
    return matchesLanguage && (text === "" || matchesSearch);
  });

  const openPdf = (item) => {
    setSelectedGuide(item);
    setViewerVisible(true);
  };

  const closePdf = () => {
    setViewerVisible(false);
    setSelectedGuide(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Text style={{ fontSize: 20 }}>{"<<"}</Text>
      </TouchableOpacity>

      {/* Logo + Title */}
      <View style={styles.logoWrapper}>
        <Image
          source={{
            uri: "https://via.placeholder.com/80x80.png?text=Logo",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Health{"\n"}Guide</Text>
      </View>

      {/* Language Selector */}
      <Text style={styles.sectionLabel}>Select Language</Text>

      <View style={styles.languagePickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          dropdownIconColor="#fff"
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.languagePicker}
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="සිංහල" value="Sinhala" />
          <Picker.Item label="தமிழ்" value="Tamil" />
        </Picker>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search health topic"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionLabel}>
        {search ? `Results for "${search}"` : "Results for your search"}
      </Text>

      {/* Grid */}
      <FlatList
        data={filteredFiles}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        ListEmptyComponent={
          <Text style={{ paddingHorizontal: 20, marginTop: 10, color: "#777" }}>
            No guides found.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openPdf(item)}>
            <Text style={styles.cardSubtitle}>{item.topic}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.downloadIcon}>⬇</Text>
          </TouchableOpacity>
        )}
      />

      {/* PDF Viewer */}
      <Modal visible={viewerVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.pdfHeader}>
            <TouchableOpacity onPress={closePdf}>
              <Text style={styles.backButton}>{"< Back"}</Text>
            </TouchableOpacity>
            <Text style={styles.pdfTitle}>
              {selectedGuide ? selectedGuide.title : ""}
            </Text>
          </View>

          {selectedGuide && (
            <WebView style={{ flex: 1 }} source={selectedGuide.file} />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logo: { width: 55, height: 55, marginRight: 10 },
  title: { fontSize: 28, fontWeight: "bold", lineHeight: 32 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  languagePickerContainer: {
    backgroundColor: "#001f3f",
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 5,
  },
  languagePicker: { color: "#fff", paddingHorizontal: 20 },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 12,
    marginHorizontal: 20,
    marginTop: 15,
    paddingLeft: 20,
  },
  gridContainer: { paddingHorizontal: 20, paddingTop: 10 },
  card: {
    flex: 1,
    backgroundColor: "#e6f2ff",
    borderRadius: 12,
    padding: 20,
    margin: 8,
    position: "relative",
  },
  cardSubtitle: { fontSize: 12, color: "#6c87a5" },
  cardTitle: {
    fontSize: 18,
    color: "#0b66d4",
    fontWeight: "bold",
    marginTop: 5,
  },
  downloadIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 16,
    color: "#0b66d4",
  },
  pdfHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { fontSize: 16, color: "#0b66d4", marginRight: 12 },
  pdfTitle: { fontSize: 16, fontWeight: "600", flexShrink: 1 },
});
