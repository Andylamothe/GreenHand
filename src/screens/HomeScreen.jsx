import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style/global';
import { getWeatherData } from '../utils/weatherAPI';
import { Sprout } from "lucide-react-native";
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ setScreen }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                const latitude = 45.50884;
                const longitude = -73.58781;

                const data = await getWeatherData(latitude, longitude);
                if (data) setWeather(data);
                else setError('Invalid data received from the API.');
            } catch (e) {
                setError('Error fetching weather data.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Welcome Card */}
                <View style={[styles.welcomeCard, { marginTop: 30 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.welcomeText}>Salut ,</Text>
                        <Text style={styles.farmerText}>Fermier!</Text>
                    </View>
                    <Sprout size={30} color="#fff" />

                </View>

                {/* Loading / Error */}
                {loading && <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />}
                {error && <Text style={{ color: 'red', marginTop: 20, marginLeft: 20 }}>{error}</Text>}

                {/* Weather Card */}
                {weather && !loading && !error && (
                    <View style={styles.weatherCard}>
                        <Text style={styles.weatherTitle}>Météo du jour</Text>

                        <View style={styles.weatherMetrics}>
                            <View style={styles.weatherMetric}>
                                <View style={styles.weatherIconContainer}>
                                    <Icon name="sun" size={24} color="#fff" />
                                </View>
                                <Text style={styles.weatherValue}>{weather.temperature_2m}°C</Text>
                            </View>

                            <View style={styles.weatherMetric}>
                                <View style={styles.weatherIconContainer}>
                                    <Icon name="droplet" size={24} color="#fff" />
                                </View>
                                <Text style={styles.weatherValue}>{weather.relative_humidity_2m}%</Text>
                            </View>

                            <View style={styles.weatherMetric}>
                                <View style={styles.weatherIconContainer}>
                                    <Icon name="cloud-rain" size={24} color="#fff" />
                                </View>
                                <Text style={styles.weatherValue}>{weather.precipitation_probability} %</Text>
                            </View>

                            <View style={styles.weatherMetric}>
                                <View style={styles.weatherIconContainer}>
                                    <Icon name="wind" size={24} color="#fff" />
                                </View>
                                <Text style={styles.weatherValue}>{weather.wind_speed_10m} km/h</Text>
                            </View>
                        </View>

                        {/* Bouton icône pour accéder aux graphiques */}
                        <TouchableOpacity
                            style={styles.submitButton} // ← ton style existant
                            onPress={() => setScreen("weatherDashboard")}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Voir les graphiques</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Tips Card */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsTitle}>Conseils du jour</Text>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="droplet" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Surveillez l’humidité</Text>
                            <Text style={styles.tipSubtitle}>Arrosez moins souvent, l’air sec chauffe plus vite en hiver</Text>
                        </View>
                    </View>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="alert-circle" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Maximisez la lumière</Text>
                            <Text style={styles.tipSubtitle}>Placez les plantes près des fenêtres ensoleillées ou utilisez une lampe de croissance</Text>
                        </View>
                    </View>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="check-circle" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Évitez le froid direct</Text>
                            <Text style={styles.tipSubtitle}>Gardez les plantes à l’écart des fenêtres mal isolées et des courants d’air</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
