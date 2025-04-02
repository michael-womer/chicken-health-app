// app/(tabs)/_layout.tsx

import React from 'react';
import { View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';  // Correct import using the alias

const Layout = () => {
  return (
    <View>
      <HapticTab />
    </View>
  );
};

export default Layout;