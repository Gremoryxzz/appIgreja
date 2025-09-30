import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";   // ✅ agora padronizado

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

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

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
      )}
      <Button title="Upload de Imagem" onPress={pickImage} />

      <Button title="Ir para o Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Editar Perfil" onPress={() => navigation.navigate("EditarPerfil")} />
      <Button title="Sobre o App" onPress={() => navigation.navigate("Sobre")} />

      <Button title="Sair do App" color="red" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  banner: { width: "100%", height: 200, marginBottom: 20, borderRadius: 10 },
  uploadedImage: { width: "100%", height: 200, marginVertical: 15, borderRadius: 10 },
});
