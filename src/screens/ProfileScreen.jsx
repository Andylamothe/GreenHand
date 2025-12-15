import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../style/profilStyle";

export default function ProfileScreen({user, onLogout, goToAccount, goToNotifications, goToHelp, goToAdmin}) {
     const menuItems = [
  { id: 1, label: "Account Settings", icon: "settings" },
  { id: 2, label: "Notifications", icon: "bell" },
  { id: 3, label: "Help & Support", icon: "help-circle" },
    ];


    if (user?.role === "admin") {
    menuItems.push({
        id: 99,
        label: "Admin Panel",
        icon: "shield",
    });
    }


    menuItems.push({
    id: 4,
    label: "Log Out",
    icon: "log-out",
    danger: true,
    });


   if (!user) {
    return (
        <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
        </View>
    );
    }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

       
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Feather name="user" size={28} color="white" />
            </View>

            <View>
               <Text style={styles.name}>
                {user.username?.trim()
                    ? user.username
                    : user.email}
                </Text>

              <Text style={styles.role}>{user.role || "User"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuCard}>
            {menuItems.map((item) => (
                <TouchableOpacity
                key={item.id}
                style={[
                    styles.menuItem,
                    item.danger && styles.menuItemDanger
                ]}
                onPress={() => {
                    if (item.label === "Log Out") {
                    onLogout();
                    } else if (item.label === "Account Settings") {
                    goToAccount();
                    }else if (item.label === "Notifications") {
                    goToNotifications();
                    }else if (item.label === "Help & Support") {
                    goToHelp();
                    }else if (item.label === "Admin Panel") {
                    goToAdmin();
                    }

                }}
                >
                <View style={styles.menuLeft}>
                    <View style={styles.menuIcon}>
                    <Feather name={item.icon} size={18} color="white" />
                    </View>
                    <Text style={styles.menuText}>{item.label}</Text>
                </View>

                <Feather name="chevron-right" size={18} color="white" />
                </TouchableOpacity>
            ))}
        </View>




      </ScrollView>
    </View>
    );
}

