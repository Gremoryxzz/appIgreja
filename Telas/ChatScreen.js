import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import styles from "../estilos/ChatScreen.styles";

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
        contentContainerStyle={styles.listContent}
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
