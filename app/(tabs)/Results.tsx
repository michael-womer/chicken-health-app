import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AIResultsComponent from '@/components/AIResultsComponent';

export default function Results() {
  const healthStatus = "Sick";  // Define the health status

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage} // Applying the style here
        />
      }
    >
      <AIResultsComponent
        healthStatus={healthStatus}  // Pass healthStatus prop here
        onConsultVeterinarian={() => { console.log(healthStatus); }}  // Use the healthStatus when calling the function
      />
    </ParallaxScrollView>
  );
}

// Define styles here
const styles = StyleSheet.create({
  headerImage: {
    // Add any styles you want for the headerImage
    marginTop: 20,
    marginBottom: 10,
  },
});