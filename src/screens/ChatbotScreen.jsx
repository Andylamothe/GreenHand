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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sprout, Bot, User, Send } from 'lucide-react-native';
import { styles } from '../style/global';
import { geminiService } from '../services/geminiService';
import { recommendationApi } from '../services/recommendationApi';

// Constants
const COLORS = {
  botBackground: '#4CAF50',
  userBackground: 'rgba(255, 255, 255, 0.9)',
  botMessageBg: 'rgba(255, 255, 255, 0.25)',
  userMessageBg: 'rgba(76, 175, 80, 0.3)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  inputBg: 'rgba(255, 255, 255, 0.2)',
  buttonDisabled: 'rgba(255,255,255,0.2)',
};

const ChatbotScreen = () => {
  // State
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savingMessageId, setSavingMessageId] = useState(null);
  
  // Refs
  const flatListRef = useRef(null);

  // TODO: remplacer par le userId issu de l'authentification
  const userId = 'demo-user-id';

  // Effects
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {});
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

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
                timestamp: createTimestamp(),
              }
            : msg
        )
      );
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
      await recommendationApi.saveRecommendation({
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
          <Text style={messageStyles.text}>{formatDisplayText(item.text)}</Text>
          <Text style={messageStyles.timestamp}>{item.timestamp}</Text>
          {renderSaveButton(item)}
        </View>

        {!item.isBot && renderAvatar(false)}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={emptyStateStyles.container}>
      <Sprout size={72} color="#f7f7f7ff" strokeWidth={2} style={{ marginBottom: 20 }} />
      <Text style={emptyStateStyles.title}>Bienvenue sur AgriBot!</Text>
      <Text style={emptyStateStyles.subtitle}>
        Posez-moi vos questions sur l'agriculture, la culture, l'irrigation, et plus encore.
      </Text>
    </View>
  );

  // Main Render
  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Header */}
        <View style={headerStyles.container}>
          <View style={styles.welcomeTextContainer}>
            <Text style={[styles.farmerText, { fontSize: 24 }]}>GreenBot</Text>
            <Text style={styles.welcomeText}>Ton assistant agricole</Text>
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
          <View style={[styles.weatherCard, inputContainerStyles.container]}>
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

// Styles
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
    borderColor: isBot ? 'rgba(255, 255, 255, 0.3)' : 'rgba(76, 175, 80, 0.5)',
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

export default ChatbotScreen;