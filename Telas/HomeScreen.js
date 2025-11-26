import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import { auth, db } from "../FirebaseConfig/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Importa estilos externos
import styles from "../estilos/HomeScreen.styles";

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, []);

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

  const postarStatus = async () => {
    if (!status.trim() && !selectedImage) {
      Alert.alert("Aviso", "Digite um status ou selecione uma imagem.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        autor: auth.currentUser?.email || "Anônimo",
        texto: status,
        imagem: selectedImage || null,
        likes: [],
        repostedFrom: null,
        timestamp: serverTimestamp(),
      });

      Alert.alert("Postado!", "Seu conteúdo foi publicado.");
      setStatus("");
      setSelectedImage(null);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível postar.");
    }
  };

  const excluirPost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      Alert.alert("Excluído", "O post foi removido com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o post.");
    }
  };

  const toggleLike = async (post) => {
    const postRef = doc(db, "posts", post.id);
    const isLiked = post.likes?.includes(auth.currentUser.uid);
    const updatedLikes = isLiked
      ? post.likes.filter((uid) => uid !== auth.currentUser.uid)
      : [...(post.likes || []), auth.currentUser.uid];

    await updateDoc(postRef, { likes: updatedLikes });
  };

  const comentar = async (postId) => {
    const texto = comentarios[postId];
    if (!texto?.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      autor: auth.currentUser.email,
      texto,
      timestamp: serverTimestamp(),
    });

    Alert.alert("Comentado!", "Seu comentário foi enviado.");
    setComentarios((prev) => ({ ...prev, [postId]: "" }));
  };

  const repostar = async (post) => {
    await addDoc(collection(db, "posts"), {
      autor: auth.currentUser.email,
      texto: `🔁 Repost: ${post.texto || ""}`,
      imagem: post.imagem || null,
      likes: [],
      repostedFrom: post.id,
      timestamp: serverTimestamp(),
    });

    Alert.alert("Repostado!", "O conteúdo foi compartilhado.");
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
      <Text style={styles.title}>Feed</Text>

      {/* Área de postagem */}
      <View style={styles.socialBox}>
        <View style={styles.avatarRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=" + auth.currentUser?.uid }}
            style={styles.avatar}
          />
          <TextInput
            style={styles.statusInput}
            placeholder="No que você está pensando?"
            value={status}
            onChangeText={setStatus}
          />
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.iconButton} onPress={postarStatus}>
            <Ionicons name="create" size={24} color="#007bff" />
            <Text>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#007bff" />
            <Text>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="location" size={24} color="#007bff" />
            <Text>Check-in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
      )}

      {/* Feed */}
      {posts.map((post) => {
        const isOwner = post.autor === auth.currentUser.email;
        return (
          <View key={post.id} style={styles.postCard}>
            <Text style={styles.postAutor}>{post.autor}</Text>
            {post.texto ? <Text style={styles.postTexto}>{post.texto}</Text> : null}
            {post.imagem ? (
              <Image source={{ uri: post.imagem }} style={styles.postImage} />
            ) : null}

            <View style={styles.reactionSummary}>
              <Text style={styles.reactionText}>
                💙 {post.likes?.length || 0} curtidas · 1 comentário
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(post)}>
                <Ionicons name="thumbs-up" size={18} color="#007bff" />
                <Text style={styles.actionText}>Curtir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble" size={18} color="#007bff" />
                <Text style={styles.actionText}>Comentar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => repostar(post)}>
                <Ionicons name="share-social" size={18} color="#007bff" />
                <Text style={styles.actionText}>Compartilhar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.commentBox}>
              <TextInput
                style={styles.commentInput}
                placeholder="Comente aqui..."
                value={comentarios[post.id] || ""}
                onChangeText={(text) =>
                  setComentarios((prev) => ({ ...prev, [post.id]: text }))
                }
              />
              <Button title="Enviar" onPress={() => comentar(post.id)} />
            </View>

            {isOwner && (
              <TouchableOpacity style={styles.deleteButton} onPress={() => excluirPost(post.id)}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      <Button title="Sair do App" color="red" onPress={handleLogout} />
    </ScrollView>
  );
}
