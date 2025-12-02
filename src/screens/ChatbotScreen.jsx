import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../style/global';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m your agriculture assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    },
    {
      id: '2',
      text: 'I have some questions about growing tomatoes',
      isBot: false,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    },
    {
      id: '3',
      text: 'Great! I\'d be happy to help with growing tomatoes.',
      isBot: true,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickSuggestions = [
    'When to water plants?',
    'Best fertilizer for veg',
  ];

  const sendMessage = (text = inputText) => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: text,
        isBot: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Simulation d'une réponse du bot
      setTimeout(() => {
        const botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message! I\'m processing your request...',
          isBot: true,
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: item.isBot ? 'row' : 'row-reverse',
          alignItems: 'flex-start',
        }}
      >
        {item.isBot && (
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <Text style={{ fontSize: 16 }}>🤖</Text>
          </View>
        )}
        
        {!item.isBot && (
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
          }}>
            <Text style={{ fontSize: 16 }}>👤</Text>
          </View>
        )}

        <View
          style={{
            maxWidth: '75%',
            backgroundColor: item.isBot 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(255, 255, 255, 0.25)',
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Text style={{
            fontSize: 16,
            color: '#FFFFFF',
            lineHeight: 22,
          }}>
            {item.text}
          </Text>
          <Text style={{
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 8,
          }}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.welcomeCard, { 
          marginTop: 20, 
          marginHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }]}>
          <View style={styles.welcomeTextContainer}>
            <Text style={[styles.farmerText, { fontSize: 24 }]}>AgriBot</Text>
            <Text style={styles.welcomeText}>Your farming guide</Text>
          </View>
          <View style={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Quick Suggestions */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {quickSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  marginRight: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onPress={() => sendMessage(suggestion)}
              >
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Input */}
        <View style={[styles.weatherCard, { 
          marginHorizontal: 20, 
          marginBottom: 100, // Increased to avoid navigation overlap
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
        }]}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
              color: '#FFFFFF',
              fontSize: 16,
              marginRight: 12,
            }}
            placeholder="Type your message..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;