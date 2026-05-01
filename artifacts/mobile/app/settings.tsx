import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  isDestructive?: boolean;
  noChevron?: boolean;
}

function SettingRow({ icon, label, value, onPress, isToggle, toggleValue, onToggle, isDestructive, noChevron }: SettingRowProps) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, { opacity: pressed && !isToggle ? 0.6 : 1, borderBottomColor: colors.border }]}
    >
      <Feather name={icon as any} size={18} color={isDestructive ? "#EF4444" : "#374151"} />
      <Text style={[styles.rowLabel, { color: isDestructive ? "#EF4444" : "#000" }]}>{label}</Text>
      {value && <Text style={[styles.rowValue, { color: colors.mutedForeground }]}>{value}</Text>}
      {isToggle && <Switch value={toggleValue} onValueChange={onToggle} trackColor={{ true: "#2563EB", false: "#D1D5DB" }} thumbColor="#fff" />}
      {!isToggle && !noChevron && <Feather name="chevron-right" size={16} color={colors.mutedForeground} />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, dataRetention, setDataRetention, logout, language } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSignOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert("Sign Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => { logout(); router.replace("/splash"); } },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.push("/personal-info")}
          style={({ pressed }) => [styles.profileCard, { opacity: pressed ? 0.7 : 1, backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name[0]?.toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </Pressable>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Plan</Text>
            <Text style={styles.statValue}>{user.plan}</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Credits</Text>
            <Text style={styles.statValue}>{user.credits}</Text>
          </View>
        </View>

        <View style={[styles.section, { borderColor: colors.border }]}>
          <SettingRow icon="bookmark" label="Bookmarks" onPress={() => router.push("/bookmarks")} />
          <SettingRow icon="globe" label="Select Language" value={language} onPress={() => router.push("/language")} />
          <SettingRow
            icon="database"
            label="AI Data Retention"
            isToggle
            toggleValue={dataRetention}
            onToggle={(val) => { setDataRetention(val); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
          />
          <SettingRow icon="wifi" label="Network Check" onPress={() => router.push("/network-check")} />
          <SettingRow icon="star" label="Rate App" onPress={() => {}} />
          <SettingRow icon="file-text" label="Terms of Service" onPress={() => {}} />
          <SettingRow icon="shield" label="Privacy Policy" onPress={() => {}} />
          <SettingRow icon="message-square" label="Feedback" onPress={() => router.push("/feedback")} />
        </View>

        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [styles.signOutBtn, { opacity: pressed ? 0.7 : 1, borderColor: "#EF4444" }]}
        >
          <Feather name="log-out" size={18} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>Step Up AI Version 1.0.0</Text>
      </ScrollView>
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
  content: { paddingHorizontal: 16, paddingTop: 20, gap: 16 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#374151" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#000" },
  profileEmail: { fontSize: 13, color: "#6B7280", fontFamily: "Inter_400Regular" },
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
  },
  statLabel: { fontSize: 12, fontFamily: "Inter_400Regular", marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#000" },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
    backgroundColor: "#FAFAFA",
  },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular" },
  rowValue: { fontSize: 13, fontFamily: "Inter_400Regular" },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderRadius: 999,
    paddingVertical: 14,
    gap: 8,
    marginTop: 4,
  },
  signOutText: { fontSize: 15, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#EF4444" },
  version: { textAlign: "center", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 4 },
});
