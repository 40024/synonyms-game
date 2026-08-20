import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { vocabulary, Word } from '@/data/words';


function getRandomPrompt() {
  const group =
    vocabulary[Math.floor(Math.random() * vocabulary.length)];

  const word =
    group[Math.floor(Math.random() * group.length)];

  return word;
}

export default function HomeScreen() {
  const [prompt, setPrompt] = useState(getRandomPrompt);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Synoyms Game</Text>

        <Text style={styles.word}>
          {prompt}
        </Text>

        <Text style={styles.instruction}>What's another way to say this?</Text>

        <TextInput style={styles.input} placeholder="Type your word..." value={answer} onChangeText={setAnswer} />

        <Pressable
          style={styles.button}
          onPress={() => {
            if (answer.trim() !== '') {
              setSubmitted(true);
            }
          }}
        >
          <Text style={styles.buttonText}>Check</Text>
        </Pressable>

        {submitted && (
          <>
            <Text style={styles.result}>
              You answered: {answer}
            </Text>

            <Pressable
              style={styles.nextButton}
              onPress={() => {
                setPrompt(getRandomPrompt());
                setAnswer('');
                setSubmitted(false);
              }}
            >
              <Text style={styles.nextButtonText}>Next Word</Text>
            </Pressable>
          </>
        )}
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

  object: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
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

  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#111111',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },

  result: {
    marginTop: 24,
    fontSize: 18,
  },

  nextButton: {
    marginTop: 16,
    padding: 15,
    alignItems: 'center',
  },

  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
