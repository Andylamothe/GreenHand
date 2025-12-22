import { StyleSheet } from "react-native";

const defaultTheme = {
  name: "dark",
  colors: {
    background: "#1a2e1a",
    card: "rgba(95, 133, 80, 0.4)",
    cardBorder: "rgba(169, 196, 108, 0.3)",
    text: "#F4F7E8",
    textTertiary: "rgba(255,255,255,0.7)",
    buttonBg: "rgba(95, 133, 80, 0.5)",
    danger: "rgba(180,80,80,0.4)",
    primary: "#4CAF50",
    inputBg: "rgba(255,255,255,0.2)",
  },
};

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      marginTop: 20,
      padding: 40,
      paddingBottom: 40,
    },

    profileCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 28,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
      marginBottom: 16,
    },

    profileRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },

    avatar: {
      width: 56,
      height: 56,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },

    name: {
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: "600",
    },

    role: {
      color: theme.colors.textTertiary,
      marginTop: 4,
    },

    themeInlineWrapper: {
      marginHorizontal: 20,
      marginBottom: 16,
    },

    themeInlineRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },

    themeInlineTextLabel: {
      fontSize: 15,
      color: "#708090",
      fontWeight: "600",
    },

    themeInlineText: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: "600",
    },

    themeSwitch: {
      width: 60,
      height: 32,
      borderRadius: 999,
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },

    themeSwitchHit: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
    },

    themeKnob: {
      width: 24,
      height: 24,
      borderRadius: 999,
      borderWidth: 1,
    },

    menuCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 32,
      padding: 24,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
    },

    menuItem: {
      backgroundColor: theme.colors.card,
      borderRadius: 24,
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
    },

    menuItemDanger: {
      backgroundColor: theme.colors.danger,
    },

    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    menuIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: theme.colors.buttonBg,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },

    menuText: {
      color: theme.colors.text,
      fontSize: 16,
    },

    themeToggleButton: {
      position: "absolute",
      top: 60,
      right: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.buttonBg,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    sectionTitle: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 20,
    },

    sectionTitle1: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 12,
    },

    scrollContent: {
      padding: 20,
      paddingBottom: 140,
    },

    feedbackText: {
      color: theme.colors.text,
      textAlign: "center",
      marginTop: 12,
    },

    accountHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 32,
      padding: 20,
    },

    accountHeader1: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 32,
      marginBottom: 24,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 32,
      padding: 20,
    },

    backButton: {
      marginRight: 12,
      padding: 8,
      borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.2)",
    },

    accountTitle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "700",
    },

    accountTitle1: {
      color: "#daceceff",
      fontSize: 24,
      fontWeight: "700",
    },

    accountCard: {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 28,
      padding: 20,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.25)",
      marginBottom: 16,
    },

    accountField: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
    },

    accountInput: {
      flex: 1,
      marginLeft: 12,
      color: "#FFFFFF",
      fontSize: 16,
    },

    accountInputDisabled: {
      opacity: 0.6,
    },

    saveAccountButton: {
      marginTop: 16,
      backgroundColor: "#98ad68ff",
      paddingVertical: 18,
      borderRadius: 28,
      alignItems: "center",
    },

    saveAccountText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },

    deleteOutlineButton: {
      marginTop: 32,
      borderWidth: 1,
      borderColor: "#7c3a3aff",
      backgroundColor: "#7c3a3aff",
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: "center",
    },

    deleteOutlineText: {
      color: "#ffffffff",
      fontWeight: "700",
    },

    dangerCard: {
      marginTop: 20,
      backgroundColor: "rgba(180,80,80,0.2)",
      padding: 20,
      borderRadius: 24,
    },

    dangerTitle: {
      color: "#FFDADA",
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 12,
    },

    deleteButton: {
      backgroundColor: "#8B0000",
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: "center",
      marginTop: 12,
    },

    deleteText: {
      color: "#fff",
      fontWeight: "700",
    },

    cancelDelete: {
      marginTop: 12,
      textAlign: "center",
      color: "rgba(255,255,255,0.7)",
    },

    modalOverlay: {
      flex: 4,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      padding: 20,
    },

    modalContent: {
      width: "100%",
      maxWidth: 380,
      backgroundColor: "#8b9c63ff",
      borderRadius: 20,
      padding: 24,
    },

    input: {
      backgroundColor: "#ffffff",
      color: "#918888",
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },

    saveButton: {
      backgroundColor: "#8B0000",
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
    },

    saveButtonText: {
      color: "#ffffffff",
      fontWeight: "700",
      fontSize: 16,
    },

    modalTitle: {
      color: "#F4F7E8",
      fontSize: 16,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 16,
    },

    modalCancel: {
      marginTop: 16,
      textAlign: "center",
      color: "#fff",
    },

    notificationRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgba(255,255,255,0.18)",
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
    },

    notificationLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    notificationText: {
      color: "#F4F7E8",
      fontSize: 16,
      marginLeft: 12,
    },

    helpQuestion: {
      color: "#F4F7E8",
      fontWeight: "700",
    },

    helpAnswer: {
      color: "rgba(255,255,255,0.75)",
      marginTop: 4,
      lineHeight: 20,
    },

    helpText: {
      color: "#F4F7E8",
      marginLeft: 12,
      fontSize: 17,
    },
  });

export const styles = createStyles(defaultTheme);
