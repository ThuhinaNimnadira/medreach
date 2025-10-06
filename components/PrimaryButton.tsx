import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../theme/colors";
import { s } from "../theme/spacing";

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export default function PrimaryButton({ title, onPress, loading, disabled }: Props) {
    const isDisabled = disabled || loading;
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.btn,
                pressed && styles.pressed,
                isDisabled && styles.disabled,
            ]}
            disabled={isDisabled}
        >
            {loading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.brand,
        paddingVertical: s(3.5),
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    pressed: { opacity: 0.9 },
    disabled: { opacity: 0.6 },
    text: { color: "#fff", fontWeight: "700" },
});
