import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ReportsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My reports</Text>

      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={styles.reportCard}>
          <Text style={styles.date}>01/01/1111</Text>
          <Text style={styles.reportName}>Report {i + 1}</Text>
          <Text style={styles.doctor}>Doctor name</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  reportCard: {
    backgroundColor: "#E6F0FF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  date: {
    color: "#777",
    marginBottom: 5,
  },
  reportName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  doctor: {
    color: "#555",
    marginTop: 5,
  },
});
