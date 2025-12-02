import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // Use the new SafeAreaView
import { styles } from '../style/global';
import { getWeatherData } from '../utils/weatherAPI';  // Import the getWeatherData function

const HomeScreen = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Pour montreal
    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);  // Clear any previous errors
            try {
                //Harcoder localisation
                const latitude = 44.34;  
                const longitude = 10.99; 

                //fetching
                const data = await getWeatherData(latitude, longitude);
                if (data) {
                    setWeather(data); 
                } else {
                    setError('Invalid data received from the weather API.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données météo', error);
                setError('Error fetching weather data.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []); 

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={[styles.welcomeCard, {
                marginTop: 30,
                marginHorizontal: 20,
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }]}>
                <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>Welcome back,</Text>
                <Text style={[styles.farmerText, { fontSize: 24 }]}>Farmer!</Text>
                
                </View>
            </View>

            
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {/* Error Message */}
            {error && !loading && (
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </View>
            )}

            {/* Display Weather Data */}
            {weather && !loading && !error && (
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text>Temperature: {weather.main.temp}°C</Text>
                    <Text>Conditions: {weather.weather[0].description}</Text>
                    <Text>Humidity: {weather.main.humidity}%</Text>
                    <Text>Wind Speed: {weather.wind.speed} m/s</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;
