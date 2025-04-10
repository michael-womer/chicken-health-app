import React from 'react';
import { TouchableOpacity } from 'react-native';

export const HapticTab = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      {children}
    </TouchableOpacity>
  );
};