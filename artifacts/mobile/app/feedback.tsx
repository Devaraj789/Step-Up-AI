import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { PillButton } from "@/components/PillButton";

export default function FeedbackScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Thank you!", "Your feedback has been submitted.", [{ text: "OK", onPress: () => router.back() }]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={[styles.content, { paddingBottom: bottomPad + 20 }]}>
        <View style={[styles.emailRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="mail" size={16} color={colors.mutedForeground} />
          <Text style={[styles.emailText, { color: colors.mutedForeground }]}>support@stepupai.com</Text>
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Describe your issue or feedback..."
          placeholderTextColor={colors.mutedForeground}
          multiline
          numberOfLines={8}
          style={[styles.textArea, { borderColor: colors.border, color: "#000" }]}
          textAlignVertical="top"
        />
        <View style={styles.btns}>
          <PillButton label="Cancel" variant="outline" onPress={() => router.back()} style={{ flex: 1 }} />
          <PillButton label="Submit" variant="black" onPress={handleSubmit} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: { padding: 4 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    color: "#000",
  },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20, gap: 16 },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  emailText: { fontSize: 14, fontFamily: "Inter_400Regular" },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    minHeight: 160,
  },
  btns: { flexDirection: "row", gap: 12 },
});
