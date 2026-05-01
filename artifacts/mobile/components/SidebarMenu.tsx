import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { PillButton } from "@/components/PillButton";

const { width: SCREEN_W } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(280, SCREEN_W * 0.8);

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function SidebarMenu({ visible, onClose }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isLoggedIn, user, logout } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    router.push("/login");
  };

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    router.push("/settings");
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              backgroundColor: colors.background,
              paddingTop: topPad + 16,
              paddingBottom: bottomPad + 16,
            },
          ]}
        >
          {isLoggedIn ? (
            <>
              <Pressable onPress={handleSettings} style={styles.profile}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name[0]?.toUpperCase()}</Text>
                </View>
                <View>
                  <Text style={styles.profileName}>{user.name}</Text>
                  <Text style={[styles.profileEmail, { color: colors.mutedForeground }]}>{user.email}</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <View style={styles.logoSection}>
              <View style={styles.logoBox}>
                <Feather name="star" size={18} color="#fff" />
              </View>
              <Text style={styles.logoTitle}>Step Up AI</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.links}>
            {isLoggedIn && (
              <Pressable style={styles.linkRow} onPress={handleSettings}>
                <Feather name="settings" size={18} color="#374151" />
                <Text style={styles.linkLabel}>Settings</Text>
              </Pressable>
            )}
            <Pressable style={styles.linkRow}>
              <Feather name="file-text" size={18} color="#374151" />
              <Text style={styles.linkLabel}>Terms of Service</Text>
            </Pressable>
            <Pressable style={styles.linkRow}>
              <Feather name="shield" size={18} color="#374151" />
              <Text style={styles.linkLabel}>Privacy Policy</Text>
            </Pressable>
            <Pressable style={styles.linkRow} onPress={() => router.push("/language")}>
              <Feather name="globe" size={18} color="#374151" />
              <Text style={styles.linkLabel}>Select Language</Text>
            </Pressable>
          </View>

          {!isLoggedIn && (
            <View style={styles.loginSection}>
              <View style={[styles.loginBanner, { backgroundColor: colors.accent }]}>
                <Feather name="lock" size={16} color="#2563EB" />
                <Text style={[styles.loginBannerText, { color: "#2563EB" }]}>
                  Unlock more features after login
                </Text>
              </View>
              <PillButton label="Sign up or log in" variant="black" fullWidth onPress={handleLogin} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: "row" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  logoSection: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoBox: {
    width: 36,
    height: 36,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoTitle: { fontSize: 16, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#000" },
  profile: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 16, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#374151" },
  profileName: { fontSize: 15, fontWeight: "600", fontFamily: "Inter_600SemiBold", color: "#000" },
  profileEmail: { fontSize: 12, fontFamily: "Inter_400Regular" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 20 },
  links: { gap: 2, flex: 1 },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  linkLabel: { fontSize: 15, fontFamily: "Inter_400Regular", color: "#000" },
  loginSection: { gap: 12 },
  loginBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  loginBannerText: { fontSize: 13, fontFamily: "Inter_500Medium", fontWeight: "500", flex: 1 },
});
