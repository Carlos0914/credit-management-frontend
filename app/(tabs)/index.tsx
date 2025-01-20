import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import AdminView from "@/components/AdminView";
import { StrictMode } from "react";

export default function HomeScreen() {
  const user = {
    name: "Carlos Lopez",
    email: "carloslop0914@gmail.com",
    phone_number: "8445849012",
    role: "admin", // "admin", "user"
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* , maxWidth: 420, alignSelf: "center" }}> */}
      <ScrollView>
        <ThemedView
          style={{
            backgroundColor: "darkorange",
            padding: 16,
          }}
        >
          <ThemedText style={{ color: "white", fontSize: 18 }}>
            Hola, {user.name}
          </ThemedText>
        </ThemedView>
        {user.role === "admin" && <AdminView />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
