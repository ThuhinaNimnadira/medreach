import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";


export default function Index() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoUpdatesEnabled, setAutoUpdatesEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable style={styles.headerLeft} onPress={() => {    }}>
          <Ionicons name="chevron-back-outline" size={26} color="#222" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <SettingToggle
          title="App Notifications"
          subtitle="Receive mobile app notifications"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />

        <Separator />

        <SettingToggle
          title="Auto Updates"
          subtitle="Automatically update when available"
          value={autoUpdatesEnabled}
          onValueChange={setAutoUpdatesEnabled}
        />

        <Separator />

        <SettingNav
          title="Password"
          subtitle="Update your password"
          onPress={() => {
              
          }}
        />

        <Separator />

        <SettingNav
          title="Need Help?"
          subtitle="Contact our support center"
          onPress={() => {
              
          }}
        />

        <Separator spaceAbove />

        <SettingAction
          title="Log Out"
          subtitle="Log Out From MedReach"
          color="#E53935"
          icon={<Feather name="log-out" size={18} color="#E53935" />}
          onPress={() => {
              
          }}
        />

        <Separator />

        <SettingAction
          title="Delete My Account"
          subtitle="Delete your MedReach account"
          color="#E53935"
          icon={<Feather name="trash-2" size={18} color="#E53935" />}
          onPress={() => {
              
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingToggle({ title, subtitle, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#eee", true: "#6FF3E0" }}
        thumbColor={"#ffffff"}
        ios_backgroundColor="#eee"
      />
    </View>
  );
}

function SettingNav({ title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.rowText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </Pressable>
  );
}

function SettingAction({ title, subtitle, icon, color = "#E53935", onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.rowText}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.actionIcon}>{icon}</View>
    </Pressable>
  );
}

function Separator({ spaceAbove = false }) {
  return (
    <View
      style={[
        { height: 1, backgroundColor: "#E6E6E6", marginLeft: 16, marginRight: 16 },
        spaceAbove && { marginTop: 22 },
        !spaceAbove && { marginTop: 18 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  headerLeft: {
    position: "absolute",
    left: 8,
    top: 12,
    padding: 8,
  },
  headerRight: {
    position: "absolute",
    right: 8,
    top: 12,
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#12202B",
  },
  container: {
    paddingVertical: 12,
  },
  row: {
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  rowText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    color: "#12202B",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 6,
  },
  actionIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});