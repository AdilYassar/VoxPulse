module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./src/assets/fonts'],
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
    transformer: {
      getTransformModulePath() {
        return require.resolve('react-native-typescript-transformer');
      },
    },
    resolver: {
      sourceExts: ['ts', 'tsx', 'js', 'jsx'],
    },
  };
  