import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createStyles } from "../style/profilStyle";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen({user, onLogout, goToAccount, goToNotifications, goToHelp, goToAdmin}) {
     const { theme, toggleTheme } = useTheme();
     const toggleAnim = React.useRef(new Animated.Value(theme.name === 'dark' ? 0 : 1)).current;
     const pressAnim = React.useRef(new Animated.Value(1)).current;
     const switchAnim = React.useRef(new Animated.Value(theme.name === 'dark' ? 0 : 1)).current;
     const styles = createStyles(theme);

     // Sync switch position when theme changes externally
     React.useEffect(() => {
       Animated.timing(switchAnim, {
         toValue: theme.name === 'dark' ? 0 : 1,
         duration: 200,
         useNativeDriver: false,
       }).start();
     }, [theme.name, switchAnim]);
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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

        {/* Theme toggle inline between name card and menu */}
        <View style={styles.themeInlineWrapper}>
          <View style={styles.themeInlineRow}>
            <Text style={styles.themeInlineTextLabel}>Thème</Text>
            <Animated.View
              style={[
                styles.themeSwitch,
                {
                  backgroundColor: switchAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#36404d', '#f5f5f5'],
                  }),
                  borderColor: switchAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#2b3340', '#e0e0e0'],
                  }),
                  transform: [{ scale: pressAnim }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.themeSwitchHit}
                onPressIn={() => {
                  Animated.timing(pressAnim, {
                    toValue: 0.96,
                    duration: 80,
                    useNativeDriver: false,
                  }).start();
                }}
                onPressOut={() => {
                  Animated.timing(pressAnim, {
                    toValue: 1,
                    duration: 120,
                    useNativeDriver: false,
                  }).start();
                }}
                onPress={() => {
                  const toValue = theme.name === 'dark' ? 1 : 0;
                  Animated.timing(toggleAnim, {
                    toValue,
                    duration: 260,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: false,
                  }).start();
                  Animated.timing(switchAnim, {
                    toValue,
                    duration: 260,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: false,
                  }).start();
                  toggleTheme();
                }}
              >
                <Animated.View
                  style={[
                    styles.themeKnob,
                    {
                      backgroundColor: switchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#f5f5f5', '#fcbf49'],
                      }),
                      borderColor: switchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#dfe2e7', '#fcbf49'],
                      }),
                      transform: [
                        {
                          translateX: switchAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [4, 28],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </TouchableOpacity>
            </Animated.View>
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

