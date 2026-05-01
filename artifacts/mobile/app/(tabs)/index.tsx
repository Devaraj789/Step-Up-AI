import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { PillButton } from "@/components/PillButton";
import { SidebarMenu } from "@/components/SidebarMenu";
import { PlusBottomSheet } from "@/components/PlusBottomSheet";
import { PersonalizationModal } from "@/components/PersonalizationModal";
import { ToolsBottomSheet } from "@/components/ToolsBottomSheet";

const SUGGESTIONS = [
  { id: "1", text: "Capture meetings intelligently" },
  { id: "2", text: "Create an infographic" },
  { id: "3", text: "Create a slide deck" },
  { id: "4", text: "Edit an image" },
  { id: "5", text: "Use AI to make your calls" },
  { id: "6", text: "Create an image" },
];

const AGENT_ROW1 = [
  { id: "meeting", label: "AI Meeting\nNotes", icon: "mic", color: "#0891B2", bg: "#E0F2FE" },
  { id: "slides", label: "AI Slides", icon: "layers", color: "#DC2626", bg: "#FEE2E2" },
  { id: "sheets", label: "AI Sheets", icon: "grid", color: "#16A34A", bg: "#DCFCE7" },
  { id: "docs", label: "AI Docs", icon: "file-text", color: "#2563EB", bg: "#EFF6FF" },
];

const AGENT_ROW2 = [
  { id: "chat", label: "AI Chat", icon: "message-circle", color: "#0891B2", bg: "#E0F2FE" },
  { id: "image", label: "AI Image", icon: "image", color: "#7C3AED", bg: "#F3E8FF" },
  { id: "translation", label: "Realtime\nTranslation", icon: "globe", color: "#F59E0B", bg: "#FEF3C7", isNew: true },
  { id: "all", label: "All Agents", icon: "grid", color: "#374151", bg: "#F3F4F6" },
];

const BOTTOM_NAV = [
  { id: "drive", label: "AI Drive", icon: "hard-drive" },
  { id: "hub", label: "Hub", icon: "layout" },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useApp();
  const [query, setQuery] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("drive");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const bottomNavH = 56 + bottomPad;

  const handleSend = () => {
    if (!query.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQuery("");
  };

  const handleAgentPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (id === "all") router.push("/all-agents");
  };

  const handleVoice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsVoice((prev) => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSidebarOpen(true); }}>
          <Feather name="menu" size={24} color="#000" />
        </Pressable>
        <View style={styles.headerRight}>
          {isLoggedIn ? (
            <PillButton
              label="Upgrade"
              variant="outlineBlue"
              size="sm"
              onPress={() => router.push("/settings")}
            />
          ) : (
            <PillButton
              label="Sign up"
              variant="black"
              size="sm"
              onPress={() => router.push("/login")}
            />
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomNavH + 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo + Title */}
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Feather name="star" size={18} color="#fff" />
            <Feather name="star" size={10} color="#fff" style={{ marginLeft: 2, marginTop: -6 }} />
          </View>
          <Text style={styles.appTitle}>Step Up AI Workspace</Text>
        </View>

        {/* Search Box */}
        <View style={[styles.searchBox, { borderColor: colors.border }]}>
          <Pressable
            onPress={() => setPlusOpen(true)}
            style={styles.plusBtn}
          >
            <Feather name="plus" size={20} color="#6B7280" />
          </Pressable>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Ask anything, create anything"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: "#000" }]}
            multiline
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <View style={styles.searchActions}>
            <PillButton
              label="Ultra"
              variant="blue"
              size="sm"
              onPress={() => {}}
              style={styles.ultraPill}
            />
            <Pressable onPress={handleVoice} style={styles.iconBtn}>
              <Feather name={isVoice ? "mic-off" : "mic"} size={20} color={isVoice ? "#2563EB" : "#6B7280"} />
            </Pressable>
            <Pressable onPress={handleSend} style={[styles.sendBtn, { backgroundColor: "#000" }]}>
              <Feather name="arrow-up" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Voice Active */}
        {isLoggedIn && isVoice && (
          <View style={styles.voiceRow}>
            <Pressable
              onPress={handleVoice}
              style={[styles.speakBtn, { backgroundColor: "#000" }]}
            >
              <Feather name="mic" size={16} color="#fff" />
              <Text style={styles.speakText}>Speak</Text>
            </Pressable>
          </View>
        )}

        {/* Suggestions Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestions}
        >
          {SUGGESTIONS.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => { setQuery(s.text); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              style={({ pressed }) => [styles.suggestionCard, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
            >
              <Text style={styles.suggestionText}>{s.text}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Agent Rows */}
        <Text style={styles.sectionLabel}>Agents</Text>
        <View style={styles.agentRow}>
          {AGENT_ROW1.map((a) => (
            <AgentIcon key={a.id} agent={a} onPress={() => handleAgentPress(a.id)} />
          ))}
        </View>
        <View style={[styles.agentRow, { marginTop: 8 }]}>
          {AGENT_ROW2.map((a) => (
            <AgentIcon key={a.id} agent={a} onPress={() => handleAgentPress(a.id)} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { paddingBottom: bottomPad, borderTopColor: colors.border }]}>
        {BOTTOM_NAV.map((nav) => (
          <Pressable
            key={nav.id}
            onPress={() => { setActiveNav(nav.id); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            style={styles.navItem}
          >
            <Feather
              name={nav.icon as any}
              size={22}
              color={activeNav === nav.id ? "#000" : "#9CA3AF"}
            />
            <Text style={[styles.navLabel, { color: activeNav === nav.id ? "#000" : "#9CA3AF" }]}>
              {nav.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <SidebarMenu visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <PlusBottomSheet
        visible={plusOpen}
        onClose={() => setPlusOpen(false)}
        onPersonalization={() => setPersonalizationOpen(true)}
        onTools={() => setToolsOpen(true)}
      />
      <PersonalizationModal visible={personalizationOpen} onClose={() => setPersonalizationOpen(false)} />
      <ToolsBottomSheet visible={toolsOpen} onClose={() => setToolsOpen(false)} />
    </View>
  );
}

function AgentIcon({ agent, onPress }: { agent: any; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.agentItem, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={[styles.agentIconCircle, { backgroundColor: agent.bg }]}>
        <Feather name={agent.icon} size={22} color={agent.color} />
        {agent.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>
      <Text style={styles.agentLabel} numberOfLines={2}>{agent.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerRight: {},
  scrollContent: { paddingHorizontal: 16, gap: 20 },
  logoSection: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 8 },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.3,
  },
  searchBox: {
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 12,
    gap: 8,
  },
  plusBtn: { padding: 2 },
  searchInput: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    minHeight: 22,
  },
  searchActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  ultraPill: { marginRight: 2 },
  iconBtn: { padding: 4 },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceRow: { alignItems: "center" },
  speakBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  speakText: { color: "#fff", fontSize: 14, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  suggestions: { gap: 10, paddingRight: 4 },
  suggestionCard: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    maxWidth: 160,
  },
  suggestionText: { fontSize: 13, fontFamily: "Inter_400Regular", color: "#374151", lineHeight: 18 },
  sectionLabel: { fontSize: 14, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#6B7280" },
  agentRow: { flexDirection: "row", justifyContent: "space-between" },
  agentItem: { alignItems: "center", gap: 6, width: "23%" },
  agentIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
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
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 7,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  agentLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#374151",
    fontFamily: "Inter_500Medium",
    fontWeight: "500",
    lineHeight: 14,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  navItem: { flex: 1, alignItems: "center", gap: 4, paddingVertical: 4 },
  navLabel: { fontSize: 11, fontFamily: "Inter_500Medium", fontWeight: "500" },
});
