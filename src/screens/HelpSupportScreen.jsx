import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../style/profilStyle";

export default function HelpSupportScreen({ goBack }) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.accountHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.accountTitle}>Help & Support</Text>
        </View>

        {/* FAQ */}
        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle1}>Frequently Asked Questions</Text>

          <Text style={styles.helpQuestion}>
            ❓ How do I update my profile?
          </Text>
          <Text style={styles.helpAnswer}>
            Go to Account Settings and edit your personal information.
          </Text>

          <Text style={styles.helpQuestion}>
            ❓ How do I change my password?
          </Text>
          <Text style={styles.helpAnswer}>
            You can change your password from Account Settings.
          </Text>

          <Text style={styles.helpQuestion}>
            ❓ How do I delete my account?
          </Text>
          <Text style={styles.helpAnswer}>
            In Account Settings, click on Delete Account and confirm.
          </Text>
        </View>

        
        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle1}>Contact Support</Text>

          <View style={styles.accountField}>
            <Feather name="mail" size={18} color="white" />
            <Text style={styles.helpText}>
              support@GreenHand.com
            </Text>
          </View>

          <View style={styles.accountField}>
            <Feather name="info" size={18} color="white" />
            <Text style={styles.helpText}>
              Response time: 24–48 hours
            </Text>
          </View>
        </View>

        
        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle1}>About</Text>
          <Text style={styles.helpText}>
            App version: 1.0.0
          </Text>
          <Text style={styles.helpText}>
            © 2025 – GreenHand Project
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
