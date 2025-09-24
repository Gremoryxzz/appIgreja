import React from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo à ICP</Text>

      <Image
        style={styles.banner}
        source={{ uri: "https://via.placeholder.com/400x200.png?text=Culto+de+Domingo" }}
      />
      <Image
        style={styles.banner}
        source={{ uri: "https://via.placeholder.com/400x200.png?text=Reunião+de+Oração" }}
      />

      <Button title="Ir para o Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Sobre o App" onPress={() => navigation.navigate("Sobre")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  banner: { width: "100%", height: 200, marginBottom: 20, borderRadius: 10 }
});
