import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from "react-native";
import { router } from "expo-router";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");

    const onSave = () => {
        // TODO: wire to backend later
        router.back(); // or keep the user here
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                {/* Top bar */}
                <View style={styles.topRow}>
                    <Pressable onPress={() => router.back()} hitSlop={8}>
                        <Text style={styles.back}>{`«`}</Text>
                    </Pressable>
                    <Text style={styles.topTitle}>About</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Avatar */}
                <View style={styles.avatarBlock}>
                    <View style={styles.avatar} />
                    <Pressable style={styles.editBadge}>
                        <Text style={styles.editIcon}>✎</Text>
                    </Pressable>
                    <Text style={styles.userLabel}>User</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.label}>User name</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="Usernamehere"
                            placeholderTextColor="#B0B5BD"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <Text style={styles.label}>Your Email</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.leftIcon}>
                            <Text style={styles.iconTxt}>✉️</Text>
                        </View>
                        <TextInput
                            style={[styles.input, styles.inputWithIcon]}
                            placeholder="xxx@gmail.com"
                            placeholderTextColor="#B0B5BD"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputWrap}>
                        <View style={styles.leftIcon}>
                            <Text style={styles.iconTxt}>📞</Text>
                        </View>
                        <TextInput
                            style={[styles.input, styles.inputWithIcon]}
                            placeholder="+941234567"
                            placeholderTextColor="#B0B5BD"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <Text style={styles.label}>About</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={[styles.input, { height: 56 }]}
                            placeholder="Hi , This is a demo."
                            placeholderTextColor="#B0B5BD"
                            value={about}
                            onChangeText={setAbout}
                            multiline
                        />
                    </View>
                </View>

                {/* Save button */}
                <Pressable onPress={onSave} style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.9 }]}>
                    <Text style={styles.saveTxt}>Save</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

/* palette tuned to your screenshot */
const NAVY = "#0B1B3A";
const BORDER = "#EFEFF4";
const MUTED = "#6B7280";
const PLACEHOLDER = "#B0B5BD";

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 22,
        paddingBottom: 28,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    back: { fontSize: 22, color: NAVY },
    topTitle: { fontSize: 16, fontWeight: "700", color: NAVY },

    avatarBlock: { alignItems: "center", marginTop: 8, marginBottom: 12 },
    avatar: { width: 140, height: 140, borderRadius: 70, backgroundColor: "#D9D9D9" },
    editBadge: {
        position: "absolute",
        right: (140 - 88) / 2, // visually near lower-right
        bottom: 36,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#5A5A5A",
        alignItems: "center",
        justifyContent: "center",
    },
    editIcon: { color: "#fff", fontSize: 14 },
    userLabel: { marginTop: 12, fontSize: 18, fontWeight: "800", color: "#2B2B2B" },

    form: { marginTop: 10 },
    label: { color: "#111827", fontSize: 13, fontWeight: "700", marginBottom: 8, marginTop: 10 },
    inputWrap: {
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: "#FAFAFB",
        borderRadius: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    leftIcon: { width: 36, alignItems: "center", justifyContent: "center" },
    iconTxt: { fontSize: 16, color: MUTED },
    input: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: NAVY,
    },
    inputWithIcon: { paddingLeft: 0 },

    saveBtn: {
        marginTop: 24,
        height: 56,
        borderRadius: 28,
        backgroundColor: NAVY,
        alignItems: "center",
        justifyContent: "center",
    },
    saveTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
