import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import styles from "../estilos/AbouScreen.styles";  // ✅ estilos externos

export default function DoacoesScreen() {
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
