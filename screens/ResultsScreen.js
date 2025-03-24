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


export default ResultsScreen;
