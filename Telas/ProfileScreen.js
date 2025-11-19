import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, db } from "../FirebaseConfig/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
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
      <Text style={styles.email}>
        {auth.currentUser?.email || "Email não disponível"}
      </Text>
      <Text style={styles.info}>
        Telefone: {userData?.telefone || "Não informado"}
      </Text>
      <Text style={styles.info}>
        Idade: {userData?.idade || "Não informada"}
      </Text>

      <Button
        title="Editar Perfil"
        onPress={() => navigation.navigate("EditProfile")}
      />
      <Button
        title="Trocar Senha"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <Button
        title="Sair"
        color="red"
        onPress={async () => {
          await auth.signOut();
          navigation.replace("Login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold" },
  email: { fontSize: 16, color: "gray", marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
});
