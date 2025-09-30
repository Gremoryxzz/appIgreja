import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";   // ✅ padronizado

export default function SobreScreen({ navigation }) {
  async function handleLogout() {
    await signOut(auth);
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Button title="Editar Perfil" onPress={() => navigation.navigate("EditarPerfil")} />
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});
