import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },

  socialBox: { marginBottom: 20 },
  avatarRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },

  statusInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },

  actionRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  iconButton: { alignItems: "center", gap: 4 },

  uploadedImage: { width: "100%", height: 200, marginVertical: 15, borderRadius: 10 },

  postCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postAutor: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  postTexto: { fontSize: 15, marginBottom: 10, color: "#333" },
  postImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },

  reactionSummary: { marginTop: 6 },
  reactionText: { fontSize: 14, color: "#555" },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 6,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 8,
  },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionText: { fontSize: 14, color: "#007bff", fontWeight: "500" },

  commentBox: { marginTop: 10 },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#f2f2f2",
  },

  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});

export default styles;
