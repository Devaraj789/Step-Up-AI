import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { PillButton } from "@/components/PillButton";

const COMMON_TOOLS: { group: string; tools: string[] }[] = [
  {
    group: "Google Suite",
    tools: ["Google Suite", "Gmail", "Calendar", "Drive", "Google Slides", "Google Sheets", "Google Docs", "Notion"],
  },
  {
    group: "Microsoft Suite",
    tools: ["Microsoft 365", "Outlook Email", "Outlook Calendar", "Outlook Contacts", "Microsoft Teams", "OneDrive", "SharePoint"],
  },
  {
    group: "Other",
    tools: ["Slack", "Salesforce", "HubSpot", "Pipedrive", "GitHub", "Box", "Mailchimp", "X (Twitter)", "Zoom", "LINE"],
  },
];

const MCP_TOOLS = [
  { id: "reddit", label: "Reddit MCP", icon: "message-square" },
  { id: "deepwiki", label: "Deep Wiki MCP", icon: "book" },
  { id: "chart", label: "Chart Server MCP", icon: "bar-chart-2" },
  { id: "hn", label: "Hacker News MCP", icon: "trending-up" },
];

const CATEGORY_CHIPS = ["All", "Productivity", "Communication", "Data", "AI", "Developer", "Finance", "Marketing"];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function ToolsBottomSheet({ visible, onClose }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [tab, setTab] = useState<"added" | "common" | "mcp" | "community">("common");
  const [installed, setInstalled] = useState<Set<string>>(new Set());
  const [selectedChip, setSelectedChip] = useState("All");

  const toggleInstall = (tool: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInstalled((prev) => {
      const next = new Set(prev);
      if (next.has(tool)) next.delete(tool);
      else next.add(tool);
      return next;
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: colors.background, paddingBottom: bottomPad + 8 }]}>
        <View style={styles.handle} />
        <View style={styles.tabs}>
          {(["added", "common", "mcp", "community"] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]}>
                {t === "added" ? "Added" : t === "common" ? "Common" : t === "mcp" ? "MCP Tools" : "Community"}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {tab === "added" && (
            <View style={styles.empty}>
              <Feather name="tool" size={40} color={colors.mutedForeground} />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No tools have been added yet</Text>
            </View>
          )}
          {tab === "common" && COMMON_TOOLS.map((group) => (
            <View key={group.group} style={styles.group}>
              <Text style={styles.groupTitle}>{group.group}</Text>
              {group.tools.map((tool) => (
                <View key={tool} style={[styles.toolRow, { borderBottomColor: colors.border }]}>
                  <Text style={styles.toolName}>{tool}</Text>
                  <Pressable
                    onPress={() => toggleInstall(tool)}
                    style={[styles.installBtn, installed.has(tool) && styles.installedBtn]}
                  >
                    <Text style={[styles.installText, installed.has(tool) && styles.installedText]}>
                      {installed.has(tool) ? "Installed" : "Install"}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ))}
          {tab === "mcp" && (
            <View>
              <Pressable style={[styles.addMcpBtn, { borderColor: colors.primary }]}>
                <Feather name="plus" size={18} color={colors.primary} />
                <Text style={[styles.addMcpText, { color: colors.primary }]}>Add new MCP server</Text>
              </Pressable>
              {MCP_TOOLS.map((t) => (
                <View key={t.id} style={[styles.toolRow, { borderBottomColor: colors.border }]}>
                  <Feather name={t.icon as any} size={18} color="#374151" />
                  <Text style={[styles.toolName, { marginLeft: 8 }]}>{t.label}</Text>
                  <Pressable
                    onPress={() => toggleInstall(t.id)}
                    style={[styles.installBtn, installed.has(t.id) && styles.installedBtn]}
                  >
                    <Text style={[styles.installText, installed.has(t.id) && styles.installedText]}>
                      {installed.has(t.id) ? "Added" : "Add"}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
          {tab === "community" && (
            <View>
              <Text style={styles.communityCount}>631 tools available</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
                {CATEGORY_CHIPS.map((chip) => (
                  <Pressable
                    key={chip}
                    onPress={() => setSelectedChip(chip)}
                    style={[
                      styles.chip,
                      selectedChip === chip && { backgroundColor: "#2563EB" },
                    ]}
                  >
                    <Text style={[styles.chipText, selectedChip === chip && { color: "#fff" }]}>{chip}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Text style={[styles.emptyText, { color: colors.mutedForeground, marginTop: 20 }]}>
                Browse community tools by category above
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    maxHeight: "80%",
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  tabs: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 4, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  tabBtn: { paddingVertical: 10, paddingHorizontal: 12, marginRight: 4 },
  tabBtnActive: { borderBottomWidth: 2, borderBottomColor: "#000" },
  tabLabel: { fontSize: 13, fontFamily: "Inter_500Medium", color: "#6B7280" },
  tabLabelActive: { color: "#000", fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20 },
  empty: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 15, fontFamily: "Inter_400Regular", textAlign: "center" },
  group: { marginBottom: 16 },
  groupTitle: { fontSize: 14, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#374151", marginBottom: 8 },
  toolRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth },
  toolName: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular", color: "#000" },
  installBtn: { backgroundColor: "#2563EB", borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  installedBtn: { backgroundColor: "#F3F4F6" },
  installText: { fontSize: 12, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#fff" },
  installedText: { color: "#6B7280" },
  addMcpBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  addMcpText: { fontSize: 14, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  communityCount: { fontSize: 16, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#000", marginBottom: 12 },
  chips: { flexDirection: "row" },
  chip: {
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipText: { fontSize: 13, fontFamily: "Inter_500Medium", color: "#374151" },
});
