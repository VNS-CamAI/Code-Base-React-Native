import { Platform, StyleSheet } from 'react-native';
export const style = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    // alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
    ...Platform.select({
      ios: {
        paddingBottom: 64,
      },
      android: {
        paddingBottom: 17,
      },
    }),
  },
  item: {},
});
