import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { addAppointment } from "./appointmentsStore";

const NAVY = "#0B1B3A";
const TEAL = "#1FD4C2";
const MUTED = "#6B7280";

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
];

export default function DoctorInfo() {
  const { doctorName, specialization } = useLocalSearchParams();
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);

  const handleBook = async () => {
    const newApp = {
      id: Math.random().toString(36).substring(7),
      doctorName: doctorName as string,
      specialization: specialization as string,
      dateTime: `Tomorrow, ${selectedSlot}`,
      createdAt: new Date().toISOString(),
    };

    await addAppointment(newApp);
    
    Alert.alert(
      "Success!",
      `Appointment booked with ${doctorName} for ${selectedSlot}`,
      [
        {
          text: "View My Appointments",
          onPress: () => router.push("/appointments"),
        },
        {
          text: "OK",
          onPress: () => router.back(),
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={NAVY} />
        </Pressable>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Doctor Info Card */}
        <View style={styles.docCard}>
          <View style={styles.avatar}>
            <FontAwesome5 name="user-md" size={40} color={TEAL} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.docName}>{doctorName}</Text>
            <Text style={styles.docSpec}>{specialization}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>4.8 (120+ reviews)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Available Time Slots</Text>
        <View style={styles.slotsGrid}>
          {TIME_SLOTS.map((slot) => (
            <Pressable
              key={slot}
              style={[
                styles.slotBtn,
                selectedSlot === slot && styles.slotBtnActive,
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                style={[
                  styles.slotTxt,
                  selectedSlot === slot && styles.slotTxtActive,
                ]}
              >
                {slot}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={MUTED} />
          <Text style={styles.infoBoxTxt}>
            Please arrive 15 minutes before your scheduled appointment time.
          </Text>
        </View>

        <Pressable style={styles.confirmBtn} onPress={handleBook}>
          <Text style={styles.confirmTxt}>Confirm Appointment</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: NAVY },
  scroll: { padding: 20 },
  docCard: {
    flexDirection: "row",
    backgroundColor: "#F0F9FF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#E1EFFE",
  },
  docName: { fontSize: 22, fontWeight: "800", color: NAVY },
  docSpec: { fontSize: 16, color: MUTED, marginTop: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  ratingText: { fontSize: 12, color: MUTED, marginLeft: 4 },
  sectionLabel: { fontSize: 18, fontWeight: "700", color: NAVY, marginBottom: 16 },
  slotsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 30 },
  slotBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    minWidth: 100,
    alignItems: "center",
  },
  slotBtnActive: { backgroundColor: TEAL, borderColor: TEAL },
  slotTxt: { color: NAVY, fontWeight: "600" },
  slotTxtActive: { color: "#fff" },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  infoBoxTxt: { flex: 1, color: MUTED, fontSize: 13, marginLeft: 10 },
  confirmBtn: {
    backgroundColor: NAVY,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmTxt: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
