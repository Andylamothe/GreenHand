import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../style/global';
import { getWeatherData } from '../utils/weatherAPI';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                {/* dogota colombie a remplcacer avec la location */}
                const latitude = 4.624335;
                const longitude = -74.063;

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
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

                {/* Welcome Card */}
                <View style={[styles.welcomeCard, { marginTop: 30 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.welcomeText}>Welcome back,</Text>
                        <Text style={styles.farmerText}>Farmer!</Text>
                    </View>
                    <Icon name="sprout" size={32} color="#fff" />
                </View>

                {/* Loading / Error */}
                {loading && <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />}
                {error && <Text style={{ color: 'red', marginTop: 20, marginLeft: 20 }}>{error}</Text>}

                {/* Weather Card */}
                {weather && !loading && !error && (
                    <View style={styles.weatherCard}>
                        <Text style={styles.weatherTitle}>Today's Weather</Text>

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
                    </View>
                )}

                {/* Tips Card */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsTitle}>Today's Tips</Text>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="droplet" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Water your tomatoes</Text>
                            <Text style={styles.tipSubtitle}>Best time is early morning</Text>
                        </View>
                    </View>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="alert-circle" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Check for pests</Text>
                            <Text style={styles.tipSubtitle}>Inspect leaves regularly</Text>
                        </View>
                    </View>

                    <View style={styles.tipItem}>
                        <View style={styles.tipIconContainer}>
                            <Icon name="check-circle" size={20} color="#fff" />
                        </View>
                        <View style={styles.tipTextContainer}>
                            <Text style={styles.tipTitle}>Harvest ready</Text>
                            <Text style={styles.tipSubtitle}>3 crops are ready to harvest</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>


            
        </SafeAreaView>
    );
};

export default HomeScreen;
