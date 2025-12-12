import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  headerCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  searchInput: {
    color: "#fff",
    flex: 1,
  },

  filtersContainer: {
    marginVertical: 15,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    color: "white",
    opacity: 0.8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.7,
    marginTop: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  addIcon: {
    fontSize: 30,
    color: "#fff",
  },
});
