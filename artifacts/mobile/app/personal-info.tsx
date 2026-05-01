import { Feather } from "@expo/vector-icons";
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
import { useApp } from "@/context/AppContext";
import { PillButton } from "@/components/PillButton";

export default function PersonalInfoScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleSave = () => {
    setUser({ ...user, name });
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name[0]?.toUpperCase() || "U"}</Text>
          </View>
          <Pressable style={styles.pencilBtn}>
            <Feather name="edit-2" size={14} color="#fff" />
          </Pressable>
        </View>

        <View style={[styles.field, { borderColor: colors.border }]}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.fieldInput, { color: "#000" }]}
            placeholder="Your name"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>

        <View style={[styles.field, { borderColor: colors.border, backgroundColor: colors.muted }]}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Email</Text>
          <Text style={styles.fieldValue}>{user.email}</Text>
        </View>

        <Pressable style={({ pressed }) => [styles.sessionBtn, { opacity: pressed ? 0.7 : 1, borderColor: colors.border }]}>
          <Feather name="shield" size={18} color="#374151" />
          <Text style={styles.sessionLabel}>Manage Login Sessions</Text>
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
        </Pressable>

        <PillButton label="Save Changes" variant="black" fullWidth onPress={handleSave} style={{ marginTop: 8 }} />

        <Pressable style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </Pressable>
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
  content: { paddingHorizontal: 24, paddingTop: 32, gap: 16 },
  avatarSection: { alignSelf: "center", marginBottom: 8, position: "relative" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 28, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#374151" },
  pencilBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  fieldLabel: { fontSize: 12, fontFamily: "Inter_400Regular", marginBottom: 4 },
  fieldInput: { fontSize: 15, fontFamily: "Inter_500Medium", fontWeight: "500" },
  fieldValue: { fontSize: 15, fontFamily: "Inter_500Medium", fontWeight: "500", color: "#6B7280" },
  sessionBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    backgroundColor: "#FAFAFA",
  },
  sessionLabel: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular", color: "#000" },
  deleteBtn: { alignItems: "center", paddingVertical: 12 },
  deleteText: { color: "#EF4444", fontSize: 15, fontFamily: "Inter_500Medium", fontWeight: "500" },
});
