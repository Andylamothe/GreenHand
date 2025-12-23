import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen: {
    padding: 20,
    paddingTop: 50,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  backIcon: {
    color: "#F4F7E8",
    fontSize: 14,
    marginRight: 6,
    fontWeight: "bold",
   
  },

  backText: {
    color: "#F4F7E8",
    fontSize: 14,
  },

  stepContainer: {
    marginTop: 40,
  },

  title: {
    color: "#F4F7E8",
    fontSize: 22,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    color: "#F4F7E8",
  },

  descriptionInput: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 25,
    borderRadius: 20,
    color: "#F4F7E8",
    height: 120,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  categoryItem: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },

  categorySelected: {
    backgroundColor: "rgba(239, 183, 183, 0.35)",
  },

  categoryText: {
    color: "#F4F7E8",
    fontSize: 18,
  },

  dateText: {
    color: "#F4F7E8"
  },

  bottomSpace: {
    marginBottom: 30,
  },

  dateButton: {
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  borderRadius: 14,
  paddingVertical: 14,
  paddingHorizontal: 18,
  marginVertical: 12,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.25)",
},

dateButtonContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
},

dateText: {
  color: "#F4F7E8",
  fontSize: 16,
  fontWeight: "500",
},

hintText: {
  color: "rgba(255,255,255,0.5)",
  fontSize: 12,
  textAlign: "center",
  marginBottom: 20,
},

});