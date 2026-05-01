import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Modal,
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

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function PersonalizationModal({ visible, onClose }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleAuto = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const handleManual = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: colors.background, paddingBottom: bottomPad + 16 }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Let Step Up AI Know You</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          More personalized responses
        </Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Paste your LinkedIn URL, Twitter URL, personal website, or description"
          placeholderTextColor={colors.mutedForeground}
          multiline
          numberOfLines={4}
          style={[styles.input, { borderColor: colors.border, color: "#000" }]}
          textAlignVertical="top"
        />
        <View style={styles.btns}>
          <PillButton label="Manual Input" variant="outline" onPress={handleManual} style={{ flex: 1 }} />
          <PillButton label="Auto Research" variant="blue" onPress={handleAuto} style={{ flex: 1 }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    minHeight: 100,
    marginBottom: 16,
  },
  btns: { flexDirection: "row", gap: 12 },
});
