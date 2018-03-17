import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

/** -- Local Imports */
import Colors from '../../constants/colors';

export default class QAStep extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.h1}>{ this.props.step.question }</Text> 
        <RadioGroup
          onSelect={(index, value) => this.props.onSelect(index, value)}
          size={24}
          thickness={2}
          color={Colors.white}
          highlightColor={Colors.lightSecondary}
          selectedIndex={0}
        >
          <RadioButton value={'item1'}>
            <Text style={styles.radioText}>{this.props.step.options[0]}</Text>
          </RadioButton>

          <RadioButton value={'item2'}>
            <Text style={styles.radioText}>{this.props.step.options[1]}</Text>
          </RadioButton>

          <RadioButton value={'item3'}>
            <Text style={styles.radioText}>{this.props.step.options[2]}</Text>
          </RadioButton>

          <RadioButton value={'item4'}>
            <Text style={styles.radioText}>{this.props.step.options[3]}</Text>
          </RadioButton>
        </RadioGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioText: {
    color: Colors.white,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
