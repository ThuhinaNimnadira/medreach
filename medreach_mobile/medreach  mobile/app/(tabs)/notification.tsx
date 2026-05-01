import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
  
type Notification = {
  id: number;
  title: string;
  time: string;
  description: string;
  highlight?: boolean;
};

type NotificationsState = {
  today: Notification[];
  yesterday: Notification[];
  older: Notification[];
};

export default function Notifications() {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState<NotificationsState>({
    today: [],
    yesterday: [],
    older: [],
  });
  
  const fetchNotifications = async () => {
    setNotifications({
      today: [
        {
          id: 1,
          title: "Scheduled Appointment",
          time: "2 M",
          description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
          id: 2,
          title: "Scheduled Change",
          time: "2 H",
          description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          highlight: true,
        },
        {
          id: 3,
          title: "Medical Notes",
          time: "3 H",
          description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
      ],
      yesterday: [
        {
          id: 4,
          title: "Scheduled Appointment",
          time: "1 D",
          description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
      ],
      older: [
        {
          id: 5,
          title: "Medical History Update",
          time: "5 D",
          description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
      ],
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

       
      <View style={styles.topBar}>
        <View style={styles.tabSelected}>
          <Text style={styles.tabTextSelected}>Today</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            placeholder="Search…"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
         
        {notifications.today.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}

         
        <Text style={styles.sectionLabel}>Yesterday</Text>
        {notifications.yesterday.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}

         
        <Text style={styles.dateLabel}>15 July</Text>
        {notifications.older.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

function NotificationCard({ item }: { item: Notification }) {
  return (
    <View
      style={[
        styles.card,
        item.highlight && { backgroundColor: "#E6FAFF" },
      ]}
    >
      <View style={styles.iconBox}>
        <Ionicons name="calendar-outline" size={26} color="white" />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>

      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    gap: 10,
  },

  tabSelected: {
    backgroundColor: "#000",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  tabTextSelected: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
  },

  searchInput: {
    marginLeft: 6,
    flex: 1,
  },

  markAll: {
    color: "#00C4B4",
    fontSize: 14,
    fontWeight: "600",
  },

  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
  },

  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    marginBottom: 10,
    alignItems: "flex-start",
  },

  iconBox: {
    width: 55,
    height: 55,
    backgroundColor: "#1FD4C2",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  cardDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  time: {
    fontSize: 12,
    color: "#777",
  },
});

