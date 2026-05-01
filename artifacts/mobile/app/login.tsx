import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

const LOGIN_OPTIONS = [
  { id: "google", label: "Continue with Google", icon: "globe", color: "#DB4437" },
  { id: "microsoft", label: "Continue with Microsoft", icon: "monitor", color: "#0078D4" },
  { id: "apple", label: "Continue with Apple", icon: "smartphone", color: "#000000" },
  { id: "email", label: "Login with email", icon: "mail", color: "#374151" },
  { id: "sso", label: "Login with SSO", icon: "key", color: "#7C3AED" },
];

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn, setUser } = useApp();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleLogin = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoggedIn(true);
    setUser({ name: "User", email: "user@email.com", plan: "Free", credits: 100 });
    router.replace("/(tabs)");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad, paddingBottom: bottomPad }]}>
      <Pressable onPress={() => router.back()} style={[styles.backBtn, { marginTop: 8 }]}>
        <Feather name="arrow-left" size={22} color="#000" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Step Up AI{"\n"}Workspace</Text>
        <Text style={styles.subtitle}>Choose your sign-in method</Text>

        <View style={styles.options}>
          {LOGIN_OPTIONS.map((opt) => (
            <Pressable
              key={opt.id}
              onPress={() => handleLogin(opt.id)}
              style={({ pressed }) => [styles.optionBtn, { opacity: pressed ? 0.7 : 1, borderColor: colors.border }]}
            >
              <View style={[styles.iconCircle, { backgroundColor: opt.color + "15" }]}>
                <Feather name={opt.icon as any} size={20} color={opt.color} />
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  backBtn: { padding: 4, alignSelf: "flex-start" },
  content: { flex: 1, justifyContent: "center", paddingBottom: 60 },
  title: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 8,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    fontFamily: "Inter_400Regular",
    marginBottom: 32,
  },
  options: { gap: 10 },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
    color: "#000",
  },
});
