import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { useColors } from "@/hooks/useColors";

type Variant = "black" | "blue" | "gray" | "outline" | "outlineBlue" | "ghost" | "red";

interface PillButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function PillButton({
  label,
  onPress,
  variant = "black",
  size = "md",
  loading = false,
  disabled = false,
  style,
  fullWidth = false,
}: PillButtonProps) {
  const colors = useColors();

  const bg: Record<Variant, string> = {
    black: "#000000",
    blue: colors.primary,
    gray: "#F3F4F6",
    outline: "transparent",
    outlineBlue: "transparent",
    ghost: "transparent",
    red: "#EF4444",
  };

  const textColor: Record<Variant, string> = {
    black: "#FFFFFF",
    blue: "#FFFFFF",
    gray: "#000000",
    outline: "#000000",
    outlineBlue: colors.primary,
    ghost: "#000000",
    red: "#FFFFFF",
  };

  const borderColor: Record<Variant, string> = {
    black: "transparent",
    blue: "transparent",
    gray: "transparent",
    outline: "#D1D5DB",
    outlineBlue: colors.primary,
    ghost: "transparent",
    red: "transparent",
  };

  const paddings = { sm: { px: 14, py: 6 }, md: { px: 20, py: 10 }, lg: { px: 28, py: 14 } };
  const fontSizes = { sm: 13, md: 15, lg: 16 };

  const { px, py } = paddings[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: bg[variant],
          borderColor: borderColor[variant],
          borderWidth: variant === "outline" || variant === "outlineBlue" ? 1.5 : 0,
          borderRadius: 999,
          paddingHorizontal: px,
          paddingVertical: py,
          alignItems: "center" as const,
          justifyContent: "center" as const,
          flexDirection: "row" as const,
          opacity: pressed ? 0.75 : disabled ? 0.5 : 1,
          ...(fullWidth ? { width: "100%" as const } : {}),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor[variant]} />
      ) : (
        <Text
          style={{
            color: textColor[variant],
            fontSize: fontSizes[size],
            fontWeight: "600",
            fontFamily: "Inter_600SemiBold",
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
