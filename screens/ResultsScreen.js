import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResultsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { imageUri, totalChickens, healthyChickens, sickChickens } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flock Health Results</Text>

      <View style={styles.healthSummary}>
        <Text style={styles.healthText}>Total Chickens: {totalChickens}</Text>
        <Text style={[styles.healthText, { color: 'green' }]}>
          Healthy Chickens: {healthyChickens}
        </Text>
        <Text style={[styles.healthText, { color: 'red' }]}>
          Sick Chickens: {sickChickens}
        </Text>
      </View>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No image captured</Text>
      )}

      <Button title="Back to Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  healthSummary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  healthText: {
    fontSize: 18,
    marginBottom: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginVertical: 20,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
});

export default ResultsScreen;
