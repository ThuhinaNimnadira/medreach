  
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useAppointments } from "./appointmentsStore";

const NAVY = "#0B1B3A";
const LIGHT = "#EAF6FD";
const MUTED = "#6B7280";

export default function AppointmentsScreen() {
  const appointments = useAppointments();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
       
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={styles.back}>{`«`}</Text>
        </Pressable>
        <Text style={styles.topTitle}>My Appointments</Text>
        <View style={{ width: 24 }} />
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>You have no appointments yet.</Text>

          <Pressable
            onPress={() => router.push("/find-doctor")}
            style={styles.addBtn}
          >
            <Text style={styles.addBtnText}>Book a Doctor</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.docName}>{item.doctorName}</Text>
                <Text style={styles.spec}>{item.specialization}</Text>
                <Text style={styles.dateTime}>{item.dateTime}</Text>
              </View>
              <Text style={styles.icon}>📋</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  back: { fontSize: 22, color: NAVY },
  topTitle: { fontSize: 18, fontWeight: "700", color: NAVY },

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyText: { fontSize: 16, color: MUTED, textAlign: "center" },

  addBtn: {
    marginTop: 16,
    backgroundColor: NAVY,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  addBtnText: { color: "#fff", fontWeight: "700" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT,
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },

  docName: { fontSize: 16, fontWeight: "800", color: NAVY },
  spec: { color: MUTED, marginTop: 2 },
  dateTime: { color: NAVY, marginTop: 4, fontWeight: "600" },
  icon: { fontSize: 26, marginLeft: 12 },
});
