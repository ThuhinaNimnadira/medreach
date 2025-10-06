import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );

    const validate = () => {
        const e: typeof errors = {};
        if (!email) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
        if (!password) e.password = "Password is required";
        else if (password.length < 6) e.password = "Min 6 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onLogin = () => {
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace("/"); // go to Dashboard (app/index.tsx)
        }, 500);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: "padding", android: undefined })}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Top bar with back chevrons */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => router.back()} hitSlop={12}>
                            <Text style={styles.back} accessibilityRole="button">
                                «
                            </Text>
                        </Pressable>

                        {/* Brand (text version so no image asset needed) */}
                        <View style={styles.logoRow}>
                            <Text style={styles.logoMed}>MED</Text>
                            <Text style={styles.logoReach}>REACH</Text>
                        </View>

                        {/* spacer to balance layout */}
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Big title */}
                    <Text style={styles.title}>Welcome back!</Text>
                    {/* If you want to match the screenshot typo literally, use:
              "Welocme back !"  */}

                    {/* Inputs */}
                    <View style={styles.form}>
                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        {errors.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}

                        <View style={styles.inputWrap}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        {errors.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : null}

                        <Pressable
                            onPress={() => {}}
                            style={styles.forgotWrap}
                            hitSlop={8}
                        >
                            <Text style={styles.forgot}>Forgot password?</Text>
                        </Pressable>

                        {/* Sign In */}
                        <Pressable
                            onPress={onLogin}
                            disabled={loading}
                            style={({ pressed }) => [
                                styles.cta,
                                pressed && { opacity: 0.9 },
                                loading && { opacity: 0.6 },
                            ]}
                        >
                            {loading ? (
                                <ActivityIndicator />
                            ) : (
                                <Text style={styles.ctaText}>Sign In</Text>
                            )}
                        </Pressable>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don’t have an account? </Text>
                        <Pressable onPress={() => {}}>
                            <Text style={styles.footerLink}>Register now</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/** Colors tuned to your screenshot */
const NAVY = "#0B1B3A";
const BORDER = "#E5E7EB";
const MUTED = "#6B7280";
const TEAL = "#1FD4C2";

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 24,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        marginBottom: 12,
    },
    back: { fontSize: 24, color: "#0F172A" },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    logoMed: { fontSize: 20, fontWeight: "900", color: TEAL, letterSpacing: 1 },
    logoReach: {
        fontSize: 20,
        fontWeight: "900",
        color: NAVY,
        letterSpacing: 1,
    },
    title: {
        marginTop: 28,
        marginBottom: 24,
        fontSize: 28,
        fontWeight: "800",
        color: NAVY,
        textAlign: "left",
    },
    form: { marginTop: 8 },
    inputWrap: {
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 14,
        marginBottom: 12,
        backgroundColor: "#FFFFFF",
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#0F172A",
    },
    errorText: { color: "#EF4444", marginTop: -6, marginBottom: 8, fontSize: 12 },
    forgotWrap: { alignSelf: "flex-end", marginTop: 2, marginBottom: 18 },
    forgot: { color: MUTED, fontSize: 14 },
    cta: {
        backgroundColor: NAVY,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    footer: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: { color: MUTED },
    footerLink: { color: NAVY, fontWeight: "700" },
});
