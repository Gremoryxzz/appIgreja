import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../FirebaseConfig/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styles from "../estilos/ProfileScreen.styles";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          Alert.alert("Erro", "Usuário não autenticado.");
          navigation.replace("Login");
          return;
        }

        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          Alert.alert("Perfil não encontrado", "Crie ou edite seu perfil.");
        }
      } catch (error) {
        Alert.alert("Erro ao carregar perfil", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            userData?.photoURL ||
            "https://i.pravatar.cc/150?u=" + auth.currentUser?.uid,
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{userData?.nome || "Sem nome"}</Text>
      <Text style={styles.role}>Designer</Text>
      <Text style={styles.location}>Los Angeles, LA</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>44</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mail-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <Text style={styles.galleryTitle}>Gallery</Text>
      <FlatList
        data={[
          { id: "1", uri: "https://source.unsplash.com/random/1" },
          { id: "2", uri: "https://source.unsplash.com/random/2" },
          { id: "3", uri: "https://source.unsplash.com/random/3" },
          { id: "4", uri: "https://source.unsplash.com/random/4" },
          { id: "5", uri: "https://source.unsplash.com/random/5" },
          { id: "6", uri: "https://source.unsplash.com/random/6" },
        ]}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryContainer}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.galleryImage} />
        )}
      />

      <View style={styles.buttonGroup}>
        <Button title="Editar Perfil" onPress={() => navigation.navigate("EditProfile")} />
        <Button title="Trocar Senha" onPress={() => navigation.navigate("ChangePassword")} />
        <Button
          title="Sair"
          color="red"
          onPress={async () => {
            await auth.signOut();
            navigation.replace("Login");
          }}
        />
      </View>
    </View>
  );
}
