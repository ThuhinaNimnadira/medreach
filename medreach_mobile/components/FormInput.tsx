import React from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps } from "react-native";
import colors from "../theme/colors";
import { s } from "../theme/spacing";

interface Props extends TextInputProps {
    label?: string;
    error?: string;
}

export default function FormInput({ label, error, ...props }: Props) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor={colors.textMuted}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: s(4) },
    label: { color: colors.text, marginBottom: s(1), fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: s(3),
        paddingVertical: s(3),
        color: colors.text,
        backgroundColor: "#fff",
    },
    inputError: { borderColor: colors.danger },
    error: { color: colors.danger, fontSize: 12, marginTop: s(1) },
});
