import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert,
} from "react-native";
import { router } from "expo-router";

export default function DoctorInfo() {
    const [dateLabel, setDateLabel] = useState("07/07/2025 10:00 AM");

    const pickDate = () => {
        // TODO: hook up a real date-time picker (e.g., @react-native-community/datetimepicker).
        // For now we just demonstrate state change:
        setDateLabel("07/08/2025 11:30 AM");
    };

    const onConfirm = () => {
        Alert.alert("Booked!", `Appointment on ${dateLabel}`);
        // router.replace("/appointments/confirm")
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                {/* Top bar */}
                <View style={styles.topRow}>
                    <Pressable onPress={() => router.back()} hitSlop={10}>
                        <Text style={styles.back}>{`«`}</Text>
                    </Pressable>
                    <Text style={styles.topTitle}>Doctor’s Info</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Doctor card */}
                <View style={styles.card}>
                    <View style={styles.avatar}>
                        <Text style={{ fontSize: 40 }}>🧑‍⚕️</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.docName}>Doctor 1</Text>
                        <Text style={styles.docSpec}>Surgical Dermatology</Text>

                        <View style={styles.ratingChip}>
                            <Text style={styles.ratingStar}>★</Text>
                            <Text style={styles.ratingTxt}>5</Text>
                        </View>
                    </View>
                </View>

                {/* Working hours pill */}
                <View style={styles.hoursPill}>
                    <Text style={styles.hoursIcon}>🗓️</Text>
                    <Text style={styles.hoursTxt}>Mon - Sat / 9 AM - 4 PM</Text>
                </View>

                {/* Bio */}
                <Text style={styles.sectionTitle}>Bio</Text>
                <View style={styles.noteBox}>
                    <Text style={styles.noteTxt}>
                        The impact of hormonal imbalances on skin conditions, specializing
                        in acne, hirsutism, and other skin disorders.
                    </Text>
                </View>

                {/* Price */}
                <Text style={styles.sectionTitle}>Price</Text>
                <View style={styles.noteBox}>
                    <Text style={styles.noteTxt}>Charges info</Text>
                </View>

                {/* Reviews */}
                <Text style={styles.sectionTitle}>Reviews</Text>
                <View style={styles.reviewRow}>
                    <View style={[styles.reviewBox, { flex: 1 }]}>
                        <Text style={styles.noteTxt}>Review 1</Text>
                    </View>
                    <View style={{ width: 12 }} />
                    <View style={[styles.reviewBox, { flex: 1 }]}>
                        <Text style={styles.noteTxt}>Review 2</Text>
                    </View>
                </View>
                <View style={[styles.reviewBox, { marginTop: 12 }]}>
                    <Text style={styles.noteTxt}>Review 3</Text>
                </View>

                {/* Date & time */}
                <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
                    Select a date and time
                </Text>
                <Pressable onPress={pickDate} style={({ pressed }) => [styles.datePill, pressed && { opacity: 0.9 }]}>
                    <Text style={styles.dateTxt}>{dateLabel}</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                </Pressable>

                {/* Confirm */}
                <Pressable onPress={onConfirm} style={({ pressed }) => [styles.confirmBtn, pressed && { opacity: 0.9 }]}>
                    <Text style={styles.confirmTxt}>Confirm Booking</Text>
                </Pressable>

                <View style={{ height: 16 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const NAVY = "#0B1B3A";
const TEAL = "#1FD4C2";
const TEAL_MINT = "#6FF6E8";
const CARD_GRAD = "#65EEDC"; // solid fill (use expo-linear-gradient later if you want a real gradient)
const LIGHT = "#EAF6FD";
const BORDER = "#DDE8F1";
const MUTED = "#6B7280";

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 6,
        marginBottom: 8,
    },
    back: { fontSize: 22, color: NAVY },
    topTitle: { fontSize: 16, fontWeight: "700", color: NAVY },

    card: {
        borderRadius: 24,
        backgroundColor: CARD_GRAD,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    avatar: {
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    docName: { fontSize: 18, fontWeight: "900", color: "#0C2130" },
    docSpec: { color: "#0C2130", opacity: 0.8, marginTop: 2 },
    ratingChip: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: "#fff",
        marginTop: 8,
    },
    ratingStar: { color: "#F59E0B", marginRight: 6, fontSize: 13 },
    ratingTxt: { color: "#0C2130", fontWeight: "800", fontSize: 12 },

    hoursPill: {
        alignSelf: "flex-start",
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
    },
    hoursIcon: { marginRight: 8, color: NAVY },
    hoursTxt: { color: NAVY, fontWeight: "700" },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
        marginTop: 16,
        marginBottom: 8,
    },
    noteBox: {
        backgroundColor: LIGHT,
        borderRadius: 16,
        padding: 14,
    },
    noteTxt: { color: MUTED, lineHeight: 20 },

    reviewRow: { flexDirection: "row" },
    reviewBox: {
        backgroundColor: LIGHT,
        borderRadius: 16,
        padding: 14,
        flexGrow: 1,
    },

    datePill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: TEAL_MINT,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 999,
        justifyContent: "space-between",
    },
    dateTxt: { color: NAVY, fontWeight: "800" },
    dateIcon: { fontSize: 18, color: NAVY },

    confirmBtn: {
        alignSelf: "center",
        marginTop: 18,
        backgroundColor: NAVY,
        paddingVertical: 16,
        paddingHorizontal: 26,
        borderRadius: 999,
    },
    confirmTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
