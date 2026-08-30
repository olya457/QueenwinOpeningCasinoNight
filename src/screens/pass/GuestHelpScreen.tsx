import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {faqAnswers, helpQuestions} from '../../data/services';

const initialMessages = [
  {id: '1', from: 'bot', text: 'Hello! How can I help with your Queenwin arrival today?'},
  {id: '2', from: 'user', text: 'Can I reserve parking before the event?'},
  {id: '3', from: 'bot', text: 'Yes. Open the Services tab, switch to Parking, select an available space, add your vehicle details, and send your reservation request.'},
  {id: '4', from: 'user', text: 'Where can I see the opening plan?'},
  {id: '5', from: 'bot', text: 'Open the Events tab to view the full opening schedule, featured moments, entertainment program, and event details.'},
];

export function GuestHelpScreen() {
  const [messages, setMessages] = useState(initialMessages);

  const askQuestion = (question: string) => {
    setMessages(current => [
      ...current,
      {id: `${current.length + 1}`, from: 'user', text: question},
      {id: `${current.length + 2}`, from: 'bot', text: faqAnswers[question]},
    ]);
  };

  return (
    <BackgroundScreen image={images.loaderBackground}>
      {messages.map(message => (
        <View key={message.id} style={[styles.messageRow, message.from === 'user' && styles.messageRowUser]}>
          <Card style={[styles.messageBubble, message.from === 'user' && styles.messageBubbleUser]}>
            <Text style={[styles.messageText, message.from === 'user' && styles.messageTextUser]}>{message.text}</Text>
          </Card>
        </View>
      ))}
      <View style={{gap: 12}}>
        <Text style={styles.quickLabel}>Quick questions</Text>
        <View style={styles.chips}>
          {helpQuestions.map(question => (
            <Pressable key={question} onPress={() => askQuestion(question)} style={styles.questionChip}>
              <Text style={styles.questionChipText}>{question}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    alignItems: 'flex-start',
  },
  messageRowUser: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '86%',
  },
  messageBubbleUser: {
    backgroundColor: colors.accent,
  },
  messageText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  messageTextUser: {
    color: '#041218',
    fontWeight: '600',
  },
  quickLabel: {
    color: colors.muted,
    fontSize: 13,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  questionChip: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  questionChipText: {
    color: colors.text,
    fontSize: 14,
  },
});
