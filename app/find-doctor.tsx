import React, { useMemo, useState } from "react";
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

type Doctor = {
    id: string;
    name: string;
    specialty: string;
};

const NAVY = "#0B1B3A";
const TEAL = "#1FD4C2";
const TEAL_DARK = "#0CBFB0";
const BORDER = "#E9EEF3";
const MUTED = "#6B7280";

export default function FindDoctor() {
    const [openPicker, setOpenPicker] = useState(false);
    const specialties = ["Cardiology", "Neurology", "Pediatrics", "Dermatology", "Oncology"];
    const [selected, setSelected] = useState("Cardiology");

    const doctors = useMemo<Doctor[]>(
        () => [
            { id: "1", name: "Doctor 1", specialty: "Maternal-Fetal Medicine" },
            { id: "2", name: "Doctor 2", specialty: "Interventional Cardiologist" },
            { id: "3", name: "Doctor 3", specialty: "General Doctor" },
            { id: "4", name: "Doctor 4", specialty: "General Doctor" },
        ],
        []
    );

    const applySpecialty = (sp: string) => {
        setSelected(sp);
        setOpenPicker(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                {/* Top bar */}
                <View style={styles.topRow}>
                    <Pressable onPress={() => router.back()} hitSlop={8}>
                        <Text style={styles.back}>{`«`}</Text>
                    </Pressable>
                    <Text style={styles.title}>Find a Doctor</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Specialty selector */}
                <Text style={styles.label}>Select Specialty</Text>
                <Pressable style={styles.select} onPress={() => setOpenPicker(true)}>
                    <Text style={styles.selectIcon}>❤</Text>
                    <Text style={styles.selectValue}>{selected}</Text>
                    <Text style={styles.selectCaret}>▾</Text>
                </Pressable>

                {/* Find button */}
                <Pressable style={({ pressed }) => [styles.findBtn, pressed && { opacity: 0.9 }]}>
                    <Text style={styles.findTxt}>Find</Text>
                </Pressable>

                {/* List header */}
                <Text style={[styles.label, { marginTop: 16 }]}>Find a Doctor</Text>

                {/* Doctors list */}
                <View style={{ gap: 18 }}>
                    {doctors.map((d) => (
                        <DoctorRow key={d.id} doctor={d} />
                    ))}
                </View>

                {/* Spacer for bottom gesture bar */}
                <View style={{ height: 24 }} />
            </ScrollView>

            {/* Specialty picker (simple modal) */}
            <Modal visible={openPicker} transparent animationType="fade" onRequestClose={() => setOpenPicker(false)}>
                <Pressable style={styles.sheetBackdrop} onPress={() => setOpenPicker(false)} />
                <View style={styles.sheet}>
                    <Text style={styles.sheetTitle}>Choose a specialty</Text>
                    <FlatList
                        data={specialties}
                        keyExtractor={(i) => i}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => applySpecialty(item)}
                                style={({ pressed }) => [styles.sheetItem, pressed && { opacity: 0.8 }]}
                            >
                                <Text style={[styles.sheetItemTxt, item === selected && { color: TEAL_DARK, fontWeight: "800" }]}>
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

function DoctorRow({ doctor }: { doctor: Doctor }) {
    return (
        <View style={styles.row}>
            {/* Avatar */}
            <View style={styles.avatar}>
                <Text style={{ fontSize: 28 }}>🧑‍⚕️</Text>
            </View>

            {/* Texts + CTA */}
            <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.docName}>{doctor.name}</Text>
                        <Text style={styles.docSub}>{doctor.specialty}</Text>
                    </View>

                    <Pressable style={({ pressed }) => [styles.infoChip, pressed && { opacity: 0.85 }]}>
                        <Text style={styles.infoTxt}>Info</Text>
                    </Pressable>
                </View>

                <Pressable style={({ pressed }) => [styles.apptBtn, pressed && { opacity: 0.9 }]}>
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

    docName: { color: "#1BB6A8", fontWeight: "800", fontSize: 15, marginBottom: 2 },
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
    sheetTitle: { fontSize: 16, fontWeight: "800", color: NAVY, marginBottom: 12 },
    sheetItem: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: "#F6F8FA",
    },
    sheetItemTxt: { color: NAVY, fontWeight: "700" },
});
