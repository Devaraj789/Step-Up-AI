import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export const ALL_AGENTS = [
  { id: "super", label: "Super Agent", icon: "zap", color: "#7C3AED", bg: "#F3E8FF" },
  { id: "meeting", label: "AI Meeting Notes", icon: "mic", color: "#0891B2", bg: "#E0F2FE" },
  { id: "slides", label: "AI Slides", icon: "layers", color: "#DC2626", bg: "#FEE2E2" },
  { id: "sheets", label: "AI Sheets", icon: "grid", color: "#16A34A", bg: "#DCFCE7" },
  { id: "docs", label: "AI Docs", icon: "file-text", color: "#2563EB", bg: "#EFF6FF" },
  { id: "chat", label: "AI Chat", icon: "message-circle", color: "#0891B2", bg: "#E0F2FE" },
  { id: "image", label: "AI Image", icon: "image", color: "#7C3AED", bg: "#F3E8FF" },
  { id: "translation", label: "Realtime Translation", icon: "globe", color: "#F59E0B", bg: "#FEF3C7", isNew: true },
  { id: "custom", label: "Custom Agent", icon: "settings", color: "#6B7280", bg: "#F3F4F6" },
  { id: "photo", label: "Photo Genius", icon: "camera", color: "#EC4899", bg: "#FCE7F3" },
  { id: "video", label: "AI Video", icon: "video", color: "#EF4444", bg: "#FEE2E2" },
  { id: "dev", label: "AI Developer", icon: "code", color: "#1D4ED8", bg: "#EFF6FF" },
  { id: "designer", label: "AI Designer", icon: "pen-tool", color: "#7C3AED", bg: "#F3E8FF" },
  { id: "clip", label: "Clip Genius", icon: "scissors", color: "#0891B2", bg: "#E0F2FE" },
  { id: "pods", label: "AI Pods", icon: "headphones", color: "#16A34A", bg: "#DCFCE7" },
  { id: "research", label: "Deep Research", icon: "search", color: "#374151", bg: "#F3F4F6" },
  { id: "fact", label: "Fact Check", icon: "check-circle", color: "#22C55E", bg: "#DCFCE7" },
  { id: "call", label: "Call For Me", icon: "phone", color: "#0891B2", bg: "#E0F2FE" },
  { id: "download", label: "Download For Me", icon: "download", color: "#374151", bg: "#F3F4F6" },
  { id: "inbox", label: "Inbox", icon: "inbox", color: "#2563EB", bg: "#EFF6FF" },
  { id: "trans2", label: "Translation", icon: "globe", color: "#F59E0B", bg: "#FEF3C7" },
  { id: "drive", label: "AI Drive", icon: "hard-drive", color: "#6B7280", bg: "#F3F4F6" },
];

export default function AllAgentsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>All Agents</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.grid, { paddingBottom: (Platform.OS === "web" ? 34 : insets.bottom) + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {ALL_AGENTS.map((agent) => (
          <Pressable
            key={agent.id}
            style={({ pressed }) => [styles.agentCard, { opacity: pressed ? 0.7 : 1 }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: agent.bg }]}>
              <Feather name={agent.icon as any} size={22} color={agent.color} />
              {agent.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
            <Text style={styles.agentLabel} numberOfLines={2}>
              {agent.label}
            </Text>
          </Pressable>
        ))}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 12,
  },
  agentCard: {
    width: "30%",
    alignItems: "center",
    gap: 8,
  },
  agentIcon: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  newBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#2563EB",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  agentLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#374151",
    fontFamily: "Inter_500Medium",
    fontWeight: "500",
  },
});
