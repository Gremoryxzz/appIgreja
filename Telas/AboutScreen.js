import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";

export default function AboutScreen() {
  // chave Pix da igreja (pode ser email, CPF ou telefone)
  const pixKey = "igrejaicp@gmail.com"; 

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(pixKey);
    Alert.alert("Pix copiado!", `Chave Pix (${pixKey}) copiada para a área de transferência.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙏 Doações para a Igreja</Text>
      <Text style={styles.text}>
        Ajude nossa missão com uma contribuição via Pix.
      </Text>

      <Text style={styles.pixLabel}>Chave Pix:</Text>
      <Text style={styles.pixKey}>{pixKey}</Text>

      <Button title="📋 Copiar chave Pix" onPress={copyToClipboard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  pixLabel: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  pixKey: { fontSize: 16, color: "blue", marginBottom: 20 },
});
