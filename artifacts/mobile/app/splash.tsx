import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PillButton } from "@/components/PillButton";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";

export default function SplashScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { setIsLoggedIn, setUser } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleGoogle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoggedIn(true);
    setUser({ name: "User", email: "user@gmail.com", plan: "Free", credits: 100 });
    router.replace("/(tabs)");
  };

  const handleSignup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/login");
  };

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/login");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.inner, { paddingTop: topPad + 20, paddingBottom: bottomPad + 16 }]}>
        <View style={styles.logoSection}>
          <View style={styles.logoBox}>
            <Feather name="star" size={18} color="#fff" />
            <Feather name="star" size={12} color="#fff" style={{ marginLeft: 2, marginTop: -8 }} />
          </View>
          <Text style={styles.title}>Step Up AI</Text>
          <Text style={styles.subtitle}>Autopilot your busywork</Text>
        </View>

        <View style={styles.buttons}>
          <Pressable onPress={handleGoogle} style={styles.googleBtn}>
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>

          <PillButton
            label="Sign up (Free)"
            variant="gray"
            size="lg"
            fullWidth
            onPress={handleSignup}
            style={styles.btn}
          />

          <PillButton
            label="Log in"
            variant="outline"
            size="lg"
            fullWidth
            onPress={handleLogin}
            style={styles.btn}
          />
        </View>

        <Text style={styles.terms}>
          By continuing you agree to{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  logoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    width: 72,
    height: 72,
    backgroundColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "Inter_400Regular",
  },
  buttons: {
    gap: 12,
    marginBottom: 16,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    gap: 10,
  },
  googleG: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  googleText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  btn: { marginTop: 0 },
  terms: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    fontFamily: "Inter_400Regular",
    paddingBottom: 8,
  },
  link: {
    color: "#2563EB",
    textDecorationLine: "underline",
  },
});
