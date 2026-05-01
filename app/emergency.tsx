import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EmergencyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facing an emergency?</Text>

      <TouchableOpacity style={styles.ambulanceCard}>
        <Text style={styles.callText}>Call an</Text>
        <Text style={styles.ambulanceText}>Ambulance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.numberCard}>
        <Text style={styles.callSmall}>Call</Text>
        <Text style={styles.bigNumber}>119</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  ambulanceCard: {
    backgroundColor: "#001F3F",
    width: "100%",
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
  },
  callText: {
    color: "#AEEEEE",
    fontSize: 16,
  },
  ambulanceText: {
    color: "#AEEEEE",
    fontSize: 32,
    fontWeight: "bold",
  },
  numberCard: {
    backgroundColor: "#9FFFFF",
    width: "100%",
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
  },
  callSmall: {
    fontSize: 16,
  },
  bigNumber: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
