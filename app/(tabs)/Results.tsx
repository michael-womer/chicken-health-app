import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

const Results = () => {
  return (
    <ScrollView>
      <ParallaxScrollView>
        <ThemedText>Results Overview</ThemedText>
      </ParallaxScrollView>
      <Collapsible>
        <Text>Some collapsible content here</Text>
      </Collapsible>
      <ExternalLink url="https://example.com" />
    </ScrollView>
  );
};

export default Results;