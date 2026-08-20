import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

import { vocabulary } from '@/data/words';

function getRandomPrompt(currentGroup?: (typeof vocabulary)[number]) {
  const availableGroups = currentGroup
    ? vocabulary.filter((group) => group !== currentGroup)
    : vocabulary;

  const group =
    availableGroups[Math.floor(Math.random() * availableGroups.length)];

  const words = Array.from(group.words);

  const word =
    words[Math.floor(Math.random() * words.length)];

  return {
    group,
    word,
  };
}

export default function HomeScreen() {
  const [prompt, setPrompt] = useState(getRandomPrompt);
  const [answer, setAnswer] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Synonyms Game</Text>

        <Text style={styles.word}>
          {prompt.word.charAt(0).toUpperCase() +
            prompt.word.slice(1).toLowerCase()}
        </Text>

        <Text style={styles.instruction}>
          What's another way to say this?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type your word..."
          value={answer}
          onChangeText={(text) => {
            const normalized = text.trim().toLowerCase();

            if (prompt.group.words.has(normalized)) {
              setPrompt(getRandomPrompt(prompt.group));
              setAnswer('');
            } else {
              setAnswer(text);
            }
          }}
        />

        <Pressable
          style={styles.skipButton}
          onPress={() => {
            setPrompt(getRandomPrompt(prompt.group));
            setAnswer('');
          }}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 70,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 48,
  },

  word: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24,
  },

  instruction: {
    fontSize: 17,
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 18,
    marginBottom: 16,
  },

  skipButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },

  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
