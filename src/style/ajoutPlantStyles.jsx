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
    color: "white",
    fontSize: 14,
    marginRight: 6,
    fontWeight: "bold",
   
  },

  backText: {
    color: "white",
    fontSize: 14,
  },

  stepContainer: {
    marginTop: 40,
  },

  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    color: "white",
  },

  descriptionInput: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 25,
    borderRadius: 20,
    color: "white",
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
    color: "white",
    fontSize: 18,
  },

  dateText: {
    color: "white"
  },

  bottomSpace: {
    marginBottom: 30,
  },
});