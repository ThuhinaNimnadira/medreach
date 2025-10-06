// app/index.tsx  (or app/(tabs)/home.tsx)
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            {/* Greeting */}
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.user}>User !</Text>

            {/* Row 1 */}
            <View style={styles.row}>
                <Tile
                    titleTop="Chanel a"
                    titleMain="Doctor"
                    bg="#BFF7F0"
                    mainColor="#0B1B3A"
                    subColor="#0B1B3A"
                    // simple icon substitute
                    cornerBadge="🩺"
                />
                <Tile
                    titleTop="Health"
                    titleMain="Guide"
                    bg="#071626"
                    mainColor="#1FD4C2"
                    subColor="#1FD4C2"
                />
            </View>

            {/* Row 2: wide appointment tile */}
            <Pressable style={[styles.tileWide, { backgroundColor: "#0B0D12" }]}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.smallLabel, { color: "#1FD4C2" }]}>My</Text>
                    <Text style={[styles.titleBig, { color: "#1FD4C2" }]}>Appointments</Text>
                </View>
                <Text style={styles.emoji}>📋</Text>
            </Pressable>

            {/* Row 3: two light tiles */}
            <View style={styles.row}>
                <Tile
                    titleTop="emergency"
                    titleMain="Help"
                    bg="#EAF3FF"
                    mainColor="#2B6BED"
                    subColor="#6B7280"
                    cornerBadge="🆘"
                />
                <Tile
                    titleTop="My"
                    titleMain="Reports"
                    bg="#EAF3FF"
                    mainColor="#2B6BED"
                    subColor="#6B7280"
                    cornerBadge="📷"
                />
            </View>

            {/* Floating bottom pill bar (purely visual here) */}
            <View style={styles.pillBar}>
                <Text style={styles.pillIcon}>☰</Text>
                <Text style={styles.pillIcon}>⚙️</Text>
                <Text style={[styles.pillLogo]}>🩺</Text>
                <Text style={styles.pillIcon}>🔔</Text>
                <Text style={styles.pillIcon}>👤</Text>
            </View>
        </View>
    );
}

function Tile({
                  titleTop,
                  titleMain,
                  bg,
                  mainColor,
                  subColor,
                  cornerBadge,
              }: {
    titleTop: string;
    titleMain: string;
    bg: string;
    mainColor: string;
    subColor: string;
    cornerBadge?: string;
}) {
    return (
        <Pressable style={[styles.tile, { backgroundColor: bg }]}>
            {!!cornerBadge && <Text style={styles.cornerBadge}>{cornerBadge}</Text>}
            <Text style={[styles.smallLabel, { color: subColor }]}>{titleTop}</Text>
            <Text style={[styles.titleBig, { color: mainColor }]}>{titleMain}</Text>
        </Pressable>
    );
}

const NAVY = "#0B1B3A";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 96, // room for pill bar
    },

    hello: { fontSize: 20, color: "#0B1B3A", marginTop: 8 },
    user: {
        fontSize: 36,
        fontWeight: "900",
        color: NAVY,
        marginBottom: 18,
    },

    row: {
        flexDirection: "row",
        gap: 14,
        marginBottom: 14,
    },

    tile: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: "center",
        minHeight: 110,
        overflow: "hidden",
    },

    tileWide: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 20,
        padding: 16,
        marginBottom: 14,
    },

    smallLabel: { fontSize: 14, fontWeight: "700" },
    titleBig: { fontSize: 28, fontWeight: "900" },

    cornerBadge: {
        position: "absolute",
        right: 12,
        top: 8,
        fontSize: 20,
        opacity: 0.25,
    },

    emoji: { fontSize: 38, color: "#1FD4C2", opacity: 0.9 },

    pillBar: {
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 16,
        height: 64,
        backgroundColor: "#BFF7F0",
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    pillIcon: { fontSize: 20, color: NAVY },
    pillLogo: { fontSize: 22, fontWeight: "900", color: NAVY },
});
