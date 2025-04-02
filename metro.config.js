const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, 'ts', 'tsx', 'js', 'jsx'], // Add the extensions for TypeScript and JSX
      extraNodeModules: {
        '@': path.resolve(__dirname, 'app'), // Map '@' to the 'app' directory
      },
    },
  };
};