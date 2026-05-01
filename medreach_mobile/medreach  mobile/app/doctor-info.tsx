  
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

type Doctor = {
  id: string;
  name: string;
  specialty: string;   // text under the name
  category: string;    // used for filtering (Cardiology, etc.)
};

const NAVY = "#0B1B3A";
const TEAL = "#1FD4C2";
const TEAL_DARK = "#0CBFB0";
const BORDER = "#E9EEF3";
const MUTED = "#6B7280";
  
const ALL_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Doctor 1",
    specialty: "Maternal-Fetal Medicine",
    category: "Cardiology",
  },
  {
    id: "2",
    name: "Doctor 2",
    specialty: "Interventional Cardiologist",
    category: "Cardiology",
  },
  {
    id: "3",
    name: "Doctor 3",
    specialty: "General Doctor",
    category: "Cardiology",
  },
  {
    id: "4",
    name: "Doctor 4",
    specialty: "General Doctor",
    category: "Cardiology",
  },
  {
    id: "5",
    name: "Doctor 5",
    specialty: "Dermatologist",
    category: "Dermatology",
  },
  {
    id: "6",
    name: "Doctor 6",
    specialty: "Pediatrician",
    category: "Pediatrics",
  },
];

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Oncology",
];

export default function FindDoctor() {
  const [openPicker, setOpenPicker] = useState(false);
  const [selected, setSelected] = useState("Cardiology");
  const [visibleDoctors, setVisibleDoctors] = useState<Doctor[]>([]);
  
  const applyFilter = () => {
    const filtered = ALL_DOCTORS.filter(
      (d) => d.category === selected
    );
    setVisibleDoctors(filtered);
  };
  
  useEffect(() => {
    applyFilter();
  }, []);

  const chooseSpecialty = (sp: string) => {
    setSelected(sp);
    setOpenPicker(false);
  };

  const openDoctorInfo = (doctor: Doctor) => {
    router.push({
      pathname: "/doctor-info",
      params: {
        doctorName: doctor.name,
        specialization: doctor.specialty,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
         
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color={NAVY} />
          </Pressable>
          <Text style={styles.title}>Find a Doctor</Text>
          <View style={{ width: 24 }} />
        </View>

         
        <Text style={styles.label}>Select Specialty</Text>
        <Pressable
          style={styles.select}
          onPress={() => setOpenPicker(true)}
        >
          <FontAwesome5 name="stethoscope" size={16} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.selectValue}>{selected}</Text>
          <Ionicons name="chevron-down" size={18} color="#fff" />
        </Pressable>

         
        <Pressable
          style={({ pressed }) => [
            styles.findBtn,
            pressed && { opacity: 0.9 },
          ]}
          onPress={applyFilter}
        >
          <Text style={styles.findTxt}>Find</Text>
        </Pressable>

         
        <Text style={[styles.label, { marginTop: 16 }]}>Find a Doctor</Text>

         
        <View style={{ gap: 18 }}>
          {visibleDoctors.map((d) => (
            <DoctorRow
              key={d.id}
              doctor={d}
              onOpenDoctor={openDoctorInfo}
            />
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

       
      <Modal
        visible={openPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenPicker(false)}
      >
        <Pressable
          style={styles.sheetBackdrop}
          onPress={() => setOpenPicker(false)}
        />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Choose a specialty</Text>
          <FlatList
            data={SPECIALTIES}
            keyExtractor={(i) => i}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => chooseSpecialty(item)}
                style={({ pressed }) => [
                  styles.sheetItem,
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text
                  style={[
                    styles.sheetItemTxt,
                    item === selected && {
                      color: TEAL_DARK,
                      fontWeight: "800",
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function DoctorRow({
  doctor,
  onOpenDoctor,
}: {
  doctor: Doctor;
  onOpenDoctor: (d: Doctor) => void;
}) {
  return (
    <View style={styles.row}>
       
      <View style={styles.avatar}>
        <FontAwesome5 name="user-md" size={28} color={TEAL} />
      </View>

       
      <View style={{ flex: 1 }}>
        <View style={styles.rowTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.docName}>{doctor.name}</Text>
            <Text style={styles.docSub}>{doctor.specialty}</Text>
          </View>

           
          <Pressable
            style={({ pressed }) => [
              styles.infoChip,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => onOpenDoctor(doctor)}
          >
            <Text style={styles.infoTxt}>Info</Text>
          </Pressable>
        </View>

         
        <Pressable
          style={({ pressed }) => [
            styles.apptBtn,
            pressed && { opacity: 0.9 },
          ]}
          onPress={() => onOpenDoctor(doctor)}
        >
          <Text style={styles.apptTxt}>Make Appointment</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingTop: 6,
  },
  back: { fontSize: 22, color: NAVY },
  title: { fontSize: 16, fontWeight: "700", color: NAVY },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
    marginBottom: 8,
  },

  select: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: NAVY,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  selectIcon: { color: "#fff", marginRight: 10, fontSize: 16 },
  selectValue: { color: "#fff", fontSize: 15, fontWeight: "700", flex: 1 },
  selectCaret: { color: "#fff", fontSize: 18, marginLeft: 8 },

  findBtn: {
    alignSelf: "center",
    backgroundColor: NAVY,
    marginTop: 16,
    marginBottom: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
  },
  findTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  rowTop: { flexDirection: "row", alignItems: "center", marginBottom: 8 },

  docName: {
    color: "#1BB6A8",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 2,
  },
  docSub: { color: MUTED, fontSize: 12 },

  infoChip: {
    borderWidth: 2,
    borderColor: TEAL,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  infoTxt: { color: TEAL, fontWeight: "700" },

  apptBtn: {
    height: 28,
    borderRadius: 999,
    backgroundColor: TEAL,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  apptTxt: { color: "#fff", fontWeight: "800", fontSize: 12 },

  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  sheet: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 120,
    maxHeight: 360,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: NAVY,
    marginBottom: 12,
  },
  sheetItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#F6F8FA",
  },
  sheetItemTxt: { color: NAVY, fontWeight: "700" },
});
