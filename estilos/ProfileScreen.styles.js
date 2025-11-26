import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  loading: { marginTop: 50 },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: "#ddd",
  },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  role: { fontSize: 16, color: "#666" },
  location: { fontSize: 14, color: "#999", marginBottom: 10 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 14, color: "#666" },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 20,
  },

  galleryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  galleryContainer: {
    gap: 10,
    marginBottom: 20,
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },

  buttonGroup: {
    gap: 10,
    width: "100%",
  },
});

export default styles;
