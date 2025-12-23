import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Keyboard,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { Sprout, Bot, User, Send } from 'lucide-react-native';
import { createGlobalStyles } from '../style/global';
import { useTheme } from '../context/ThemeContext';
import { geminiService } from '../services/geminiService';
import { ChatbotApi } from '../api/chatbotApi';

const ChatbotScreen = ({ user }) => {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);
  
  // Theme-aware colors
  const COLORS = {
    botBackground: theme.colors.primary,
    userBackground: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(76, 175, 80, 0.2)',
    botMessageBg: theme.colors.card,
    userMessageBg: theme.colors.card,
    textPrimary: theme.colors.text,
    textSecondary: theme.colors.textTertiary,
    inputBg: theme.colors.inputBg,
    buttonDisabled: theme.name === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(76, 175, 80, 0.2)',
  };

  // Styles (theme-aware)
  const avatarStyles = {
    container: (backgroundColor, marginRight = 0, marginLeft = 0) => ({
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight,
      marginLeft,
    }),
  };

  const messageStyles = {
    wrapper: {
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    container: (isBot) => ({
      flexDirection: isBot ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
    }),
    bubble: (isBot) => ({
      maxWidth: '75%',
      backgroundColor: isBot ? COLORS.botMessageBg : COLORS.userMessageBg,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.cardBorder,
    }),
    text: {
      fontSize: 16,
      color: COLORS.textPrimary,
      lineHeight: 22,
      fontWeight: '400',
    },
    timestamp: {
      fontSize: 12,
      color: COLORS.textSecondary,
      marginTop: 8,
      fontWeight: '500',
    },
  };

  const saveButtonStyles = {
    container: {
      marginTop: 10,
      alignSelf: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 12,
      backgroundColor: 'rgba(76, 175, 80, 0.3)',
      borderWidth: 1.5,
      borderColor: '#4CAF50',
    },
    text: {
      color: COLORS.textPrimary,
      fontSize: 14,
      fontWeight: '600',
    },
  };

  const emptyStateStyles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: COLORS.textPrimary,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '400',
    },
  };

  const headerStyles = {
    container: {
      marginTop: 50,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
  };

  const inputContainerStyles = {
    wrapper: {
      marginBottom: 100,
    },
    container: {
      marginHorizontal: 20,
      marginBottom: 30,
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
  };

  const inputStyles = {
    textInput: {
      flex: 1,
      backgroundColor: COLORS.inputBg,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      color: COLORS.textPrimary,
      fontSize: 16,
      marginRight: 10,
      maxHeight: 80,
    },
    sendButton: (isDisabled) => ({
      backgroundColor: isDisabled ? COLORS.buttonDisabled : COLORS.botBackground,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    }),
  };
  
  // State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savingMessageId, setSavingMessageId] = useState(null);
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  
  // Refs
  const flatListRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Guard clause - user must be authenticated
  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.botBackground }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.textPrimary }}>Authentification requise</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userId = user._id || user.id;

  // Effects
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {});
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  // Simple pulse animation for loading state
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isLoading, pulseAnim]);

  // Helpers
  const createTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // Formatage uniquement à l'affichage (ne modifie pas le texte stocké)
  const formatDisplayText = (text) => {
    if (!text) return '';
    return text
      .replace(/^\s*[\*\-]\s+/gm, '• ')   // listes avec espace après * ou -
      .replace(/^\s*[\*\-](?=\S)/gm, '• ') // listes sans espace après * ou -
      .replace(/\*\*(.+?)\*\*/g, '$1')    // retire **gras**
      .replace(/\*(.+?)\*/g, '$1')          // retire *italique*
      .replace(/\n{3,}/g, '\n\n');          // limite les sauts de ligne consécutifs
  };

  // Handlers
  const sendMessage = async (text = inputText) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Create user message
    const userMessage = {
      id: Date.now().toString(),
      text: trimmed,
      isBot: false,
      timestamp: createTimestamp(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    Keyboard.dismiss();
    scrollToBottom();

    // Create bot placeholder
    const botPlaceholderId = `bot-${Date.now()}`;
    const placeholder = {
      id: botPlaceholderId,
      text: 'Analyse en cours...',
      isBot: true,
      isPlaceholder: true,
      timestamp: createTimestamp(),
      userQuery: trimmed,
    };

    setMessages(prev => [...prev, placeholder]);
    setIsLoading(true);

    try {
      const aiText = await geminiService.getAgricultureAdvice(trimmed);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === botPlaceholderId
            ? {
                ...msg,
                text: aiText,
                isPlaceholder: false,
                shouldAnimate: true,
                timestamp: createTimestamp(),
              }
            : msg
        )
      );
      setAnimatingMessageId(botPlaceholderId);
      scrollToBottom();
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botPlaceholderId
            ? { ...msg, text: 'Désolé, une erreur est survenue. Réessaie.', isPlaceholder: false }
            : msg
        )
      );
      Alert.alert('Erreur', 'Impossible de générer une réponse pour le moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecommendation = async (message) => {
    if (!message?.isBot || !message?.userQuery || !message?.text) return;
    
    setSavingMessageId(message.id);
    try {
      await ChatbotApi.saveRecommendation({
        userId,
        userQuery: message.userQuery,
        aiResponse: message.text,
      });
      Alert.alert('Succès', 'Réponse IA sauvegardée.');
    } catch (error) {
      Alert.alert('Erreur', "Impossible de sauvegarder la recommandation.");
    } finally {
      setSavingMessageId(null);
    }
  };

  // Render Components
  const TypewriterText = ({ text, messageId, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 15); // Speed of typing (ms per character)

        return () => clearTimeout(timeout);
      } else if (currentIndex === text.length && onComplete) {
        onComplete();
      }
    }, [currentIndex, text, onComplete]);

    return (
      <Text style={messageStyles.text}>
        {formatDisplayText(displayedText)}
        {currentIndex < text.length && (
          <Text style={{ opacity: 0.6 }}>▌</Text>
        )}
      </Text>
    );
  };

  const PlantSVG = ({ scale = 1 }) => (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Svg width="40" height="50" viewBox="0 0 40 50">
        {/* Pot */}
        <Path
          d="M12 35 L10 48 L30 48 L28 35 Z"
          fill="#8D6E63"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
        {/* Stem */}
        <Path
          d="M20 35 L20 20"
          stroke="#4CAF50"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Left leaf */}
        <Ellipse
          cx="14"
          cy="26"
          rx="6"
          ry="4"
          fill="#66BB6A"
          transform="rotate(-30 14 26)"
        />
        {/* Right leaf */}
        <Ellipse
          cx="26"
          cy="24"
          rx="6"
          ry="4"
          fill="#66BB6A"
          transform="rotate(30 26 24)"
        />
        {/* Top leaves */}
        <Ellipse
          cx="16"
          cy="18"
          rx="5"
          ry="3.5"
          fill="#81C784"
          transform="rotate(-45 16 18)"
        />
        <Ellipse
          cx="24"
          cy="17"
          rx="5"
          ry="3.5"
          fill="#81C784"
          transform="rotate(45 24 17)"
        />
        {/* Water drops */}
        <Circle cx="17" cy="14" r="2" fill="#64B5F6" opacity="0.7" />
        <Circle cx="23" cy="13" r="1.5" fill="#64B5F6" opacity="0.7" />
      </Svg>
    </Animated.View>
  );

  const renderAvatar = (isBot) => {
    if (isBot) {
      return (
        <View style={avatarStyles.container(COLORS.botBackground, 12)}>
          <Bot size={18} color={COLORS.textPrimary} strokeWidth={2.5} />
        </View>
      );
    }
    return (
      <View style={avatarStyles.container(COLORS.userBackground, 0, 12)}>
        <User size={18} color="#2E7D32" strokeWidth={2.5} />
      </View>
    );
  };

  const renderSaveButton = (item) => {
    if (!item.isBot || item.isPlaceholder) return null;

    return (
      <TouchableOpacity
        onPress={() => handleSaveRecommendation(item)}
        disabled={savingMessageId === item.id}
        style={saveButtonStyles.container}
      >
        {savingMessageId === item.id ? (
          <ActivityIndicator color={COLORS.textPrimary} size="small" />
        ) : (
          <Text style={saveButtonStyles.text}>Sauvegarder</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderMessage = ({ item }) => (
    <View style={messageStyles.wrapper}>
      <View style={messageStyles.container(item.isBot)}>
        {item.isBot && renderAvatar(true)}
        
        <View style={messageStyles.bubble(item.isBot)}>
          {item.isPlaceholder ? (
            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
              <PlantSVG scale={pulseAnim} />
              <Text style={[messageStyles.text, { marginTop: 12, textAlign: 'center' }]}>
                Un moment, l'IA réfléchit...
              </Text>
            </View>
          ) : (
            <>
              {item.isBot && item.shouldAnimate && animatingMessageId === item.id ? (
                <TypewriterText
                  text={item.text}
                  messageId={item.id}
                  onComplete={() => setAnimatingMessageId(null)}
                />
              ) : (
                <Text style={messageStyles.text}>{formatDisplayText(item.text)}</Text>
              )}
              <Text style={messageStyles.timestamp}>{item.timestamp}</Text>
              {renderSaveButton(item)}
            </>
          )}
        </View>

        {!item.isBot && renderAvatar(false)}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={emptyStateStyles.container}>
      <Sprout size={72} color={theme.colors.text} strokeWidth={2} style={{ marginBottom: 20 }} />
      <Text style={[emptyStateStyles.title, { color: theme.colors.text }]}>Bienvenue sur AgriBot!</Text>
      <Text style={[emptyStateStyles.subtitle, { color: theme.colors.textTertiary }]}>
        Posez-moi vos questions sur l'agriculture, la culture, l'irrigation, et plus encore.
      </Text>
    </View>
  );

  // Main Render
  return (
    <SafeAreaView style={[globalStyles.container, { flex: 1 }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Header */}
 
        
        <View style={[globalStyles.welcomeCard, { marginTop: 60 }]}>
                  <View style={{ flex: 1 }}>
            <Text style={[globalStyles.farmerText, { fontSize: 24 }]}>GreenBot</Text>
            <Text style={globalStyles.welcomeText}>Ton assistant agricole</Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          scrollEventThrottle={16}
          ListEmptyComponent={renderEmptyState}
        />

        {/* Input Container */}
        <View style={inputContainerStyles.wrapper}>
          <View style={[globalStyles.weatherCard, inputContainerStyles.container]}>
            <TextInput
              style={inputStyles.textInput}
              placeholder="Posez votre question..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => inputText.trim() && sendMessage()}
              blurOnSubmit={false}
              multiline
              maxLength={500}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={() => sendMessage()}
              disabled={isLoading || !inputText.trim()}
              style={inputStyles.sendButton(isLoading || !inputText.trim())}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.textPrimary} size="small" />
              ) : (
                <Send size={20} color={COLORS.textPrimary} strokeWidth={2.5} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;