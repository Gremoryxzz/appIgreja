import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function ChatScreen() {
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([]);

  const enviarMensagem = () => {
    if (mensagem.trim()) {
      setConversa([...conversa, { id: Date.now().toString(), texto: mensagem }]);
      setMensagem("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversa}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.msg}>{item.texto}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChangeText={setMensagem}
      />
      <Button title="Enviar" onPress={enviarMensagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  msg: { padding: 8, backgroundColor: "#f1f1f1", marginVertical: 5, borderRadius: 5 }
});
