import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8FA954",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 28,
    padding: 20,
    marginBottom: 24,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#A9C46C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  name: {
    color: "#F4F7E8",
    fontSize: 22,
    fontWeight: "600",
  },

  role: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 28,
    padding: 16,
  },

  menuItem: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  menuItemDanger: {
    backgroundColor: "rgba(180,80,80,0.4)",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    color: "#F4F7E8",
    fontSize: 16,
  },
  sectionTitle: {
  color: "#F4F7E8",
  fontSize: 20,
  fontWeight: "600",
  marginBottom: 20,
},
sectionTitle1: {
  color: "#F4F7E8",
  fontSize: 20,
  fontWeight: "600",
  marginBottom: 12,
  
},

scrollContent: {
  padding: 20,
  paddingBottom: 140, 
},

feedbackText: {
  color: "#F4F7E8",
  textAlign: "center",
  marginTop: 12,
},

sectionTitle: {
  color: "white",
  fontSize: 20,
  fontWeight: "600",
  marginTop: 32,
  marginBottom: 16,
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
  backgroundColor: "#A9C46C",
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
  borderColor: "#8B0000",
  backgroundColor:"#8B0000",
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
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

modalCard: {
  width: "100%",
  maxWidth: 380,
  backgroundColor: "rgba(101, 16, 16, 0.82)",
  borderRadius: 28,
  padding: 24,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.25)",
},

modalTitle: {
  color: "#ffffffff",
  fontSize: 16,
  fontWeight: "700",
  textAlign: "center",
  marginBottom: 16,
},

modalCancel: {
  marginTop: 16,
  textAlign: "center",
  color: "rgba(255,255,255,0.8)",
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
