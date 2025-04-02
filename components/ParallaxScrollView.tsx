import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const ParallaxScrollView = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.header}>
        <Text>Parallax Header</Text>
      </View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  header: {
    height: 200,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ParallaxScrollView;