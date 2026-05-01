import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const TOP_ROW = [
  { id: "camera", label: "Camera", icon: "camera" },
  { id: "photo", label: "Photo", icon: "image" },
  { id: "files", label: "Files", icon: "folder" },
];

const LIST_ITEMS = [
  { id: "drive", label: "From AI Drive", icon: "hard-drive" },
  { id: "edit-image", label: "Edit Image", icon: "edit" },
  { id: "tools", label: "Tools", icon: "tool" },
  { id: "personalization", label: "Personalization", icon: "user" },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onPersonalization: () => void;
  onTools: () => void;
}

export function PlusBottomSheet({ visible, onClose, onPersonalization, onTools }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: colors.background, paddingBottom: bottomPad + 16 }]}>
        <View style={styles.handle} />
        <View style={styles.topRow}>
          {TOP_ROW.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onClose(); }}
              style={({ pressed }) => [styles.topItem, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.secondary }]}>
                <Feather name={item.icon as any} size={22} color="#000" />
              </View>
              <Text style={styles.topLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {LIST_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onClose();
              if (item.id === "personalization") onPersonalization();
              if (item.id === "tools") onTools();
            }}
            style={({ pressed }) => [styles.listItem, { opacity: pressed ? 0.7 : 1, borderBottomColor: colors.border }]}
          >
            <Feather name={item.icon as any} size={20} color="#374151" />
            <Text style={styles.listLabel}>{item.label}</Text>
            <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          </Pressable>
        ))}
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
    paddingHorizontal: 16,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  topItem: { alignItems: "center", gap: 8 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topLabel: { fontSize: 13, fontFamily: "Inter_400Regular", color: "#374151" },
  divider: { height: 1, marginBottom: 8 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  listLabel: { flex: 1, fontSize: 15, fontFamily: "Inter_400Regular", color: "#000" },
});
