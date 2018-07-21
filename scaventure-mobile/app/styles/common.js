import { StyleSheet } from 'react-native';
// Importing color
import Colors from '../constants/colors';

export default StyleSheet.create({
  greenButton: {
    height: 38,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
});
