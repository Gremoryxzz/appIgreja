import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth, db, storage } from "../FirebaseConfig/firebaseConfig";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import styles from "../estilos/EditProfileScreen.styles";

export default function EditProfileScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idade, setIdade] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const uid = auth.currentUser?.uid;

        if (!uid) {
          Alert.alert("Erro", "Usuário não autenticado.");
          return;
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, {});
        }

        const data = docSnap.data() || {};
        setNome(data.nome || "");
        setTelefone(data.telefone || "");
        setIdade(data.idade || "");
        setPhotoURL(data.photoURL || null);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      try {
        const base64Img = result.assets[0].base64;

        const storageRef = ref(
          storage,
          `profilePics/${auth.currentUser.uid}.jpg`
        );

        await uploadString(storageRef, base64Img, "base64");
        const url = await getDownloadURL(storageRef);
        setPhotoURL(url);
      } catch (error) {
        Alert.alert("Erro", "Erro ao enviar a imagem: " + error.message);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        nome,
        telefone,
        idade,
        photoURL,
      });

      await updateProfile(auth.currentUser, {
        displayName: nome,
        photoURL,
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar o perfil: " + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            photoURL ||
            auth.currentUser?.photoURL ||
            `https://i.pravatar.cc/150?u=${auth.currentUser.uid}`,
        }}
        style={styles.avatar}
      />

      <Button title="Alterar Foto" onPress={pickImage} />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}
