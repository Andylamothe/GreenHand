import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../style/global";
import { Sprout } from "lucide-react-native";

const StartScreen = ({ goToLogin, goToRegister }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.welcomeCard, { marginTop: 100 }]}>
        <View>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.farmerText}>GreenHand</Text>
        </View>
        <Sprout size={40} color="#fff" style={{ marginLeft: "auto" }} />
      </View>

      <View style={{ padding: 20 }}>
        <TouchableOpacity style={styles.submitButton} onPress={goToLogin}>
          <Text style={styles.submitText}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, { marginTop: 20 }]}
          onPress={goToRegister}
        >
          <Text style={styles.submitText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
