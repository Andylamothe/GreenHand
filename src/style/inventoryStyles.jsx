import { StyleSheet } from "react-native";

export const createInventoryStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  headerCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 16,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },

  searchInput: {
    color: theme.colors.text,
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
    color: theme.colors.text,
    opacity: 0.8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.text,
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
    color: theme.colors.text,
  },
});

export default createInventoryStyles({
  name: 'dark',
  colors: {
    card: 'rgba(95, 133, 80, 0.4)',
    cardBorder: 'rgba(169, 196, 108, 0.3)',
    text: '#F4F7E8',
  }
});
