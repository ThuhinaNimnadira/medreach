  
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const NAVY = "#0B1B3A";

export default function Home() {
  return (
    <View style={styles.container}>
       
      <Text style={styles.hello}>Hello,</Text>
      <Text style={styles.user}>User !</Text>

       
      <View style={styles.row}>
        <Tile
          titleTop="Chanel a"
          titleMain="Doctor"
          bg="#BFF7F0"
          mainColor="#0B1B3A"
          subColor="#0B1B3A"
          cornerBadge={<FontAwesome5 name="stethoscope" size={24} color="#0B1B3A" />}
          onPress={() => router.push("/find-doctor")}
        />
        <Tile
          titleTop="Health"
          titleMain="Guide"
          bg="#071626"
          mainColor="#1FD4C2"
          subColor="#1FD4C2"
          onPress={() => router.push("/health-guide")}
        />
      </View>

       
      <Pressable
        style={[styles.tileWide, { backgroundColor: "#0B0D12" }]}
        onPress={() => {
          router.push("/appointments");
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.smallLabel, { color: "#1FD4C2" }]}>My</Text>
          <Text style={[styles.titleBig, { color: "#1FD4C2" }]}>
            Appointments
          </Text>
        </View>
        <Ionicons name="calendar-outline" size={38} color="#1FD4C2" style={{ opacity: 0.9 }} />
      </Pressable>

       
      <View style={styles.row}>
        <Tile
          titleTop="emergency"
          titleMain="Help"
          bg="#EAF3FF"
          mainColor="#2B6BED"
          subColor="#6B7280"
          cornerBadge={<Ionicons name="warning-outline" size={24} color="#2B6BED" />}
          onPress={() => router.push("/emergency")}
        />
        <Tile
          titleTop="My"
          titleMain="Reports"
          bg="#EAF3FF"
          mainColor="#2B6BED"
          subColor="#6B7280"
          cornerBadge={<Ionicons name="document-text-outline" size={24} color="#2B6BED" />}
          onPress={() => router.push("/myreports")}
        />
      </View>

       
      <View className="pillBar" style={styles.pillBar}>
        <Ionicons name="menu" size={24} color={NAVY} />
        <Ionicons name="settings-outline" size={24} color={NAVY} />
        <FontAwesome5 name="stethoscope" size={24} color={NAVY} />
        <Ionicons name="notifications-outline" size={24} color={NAVY} />
        <Ionicons name="person-outline" size={24} color={NAVY} />
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
  onPress,
}: {
  titleTop: string;
  titleMain: string;
  bg: string;
  mainColor: string;
  subColor: string;
  cornerBadge?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  return (
    <Pressable style={[styles.tile, { backgroundColor: bg }]} onPress={onPress}>
      {!!cornerBadge && <View style={styles.cornerBadge}>{cornerBadge}</View>}
      <Text style={[styles.smallLabel, { color: subColor }]}>{titleTop}</Text>
      <Text style={[styles.titleBig, { color: mainColor }]}>{titleMain}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 96,
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
    top: 12,
    opacity: 0.15,
  },

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
});
