import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../constants/colors';

class AnnotatedDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };

    this.onOptionPress = this.onOptionPress.bind(this);
  }

  onOptionPress(i) {
    this.toggleOptions();
    this.props.optionFunctions[i]();
  }

  toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  render() {
    const defaultIcon = (this.props.icon ? this.props.icon : 'plus');
    return (
      <View style={styles.buttonGroup} >
        <View style={styles.nestedButtons}> 
               
          { this.state.showOptions ?  
            <View style={styles.options}>
              { this.props.options.map((opt, i) => (
                <View style={[styles.buttonTextContainer, styles.buttonOptions]} key={i}>
                  <TouchableHighlight onPress={() => this.onOptionPress(i)}>
                    <Text style={styles.buttonText}>{this.props.options[i]}</Text>
                  </TouchableHighlight>
                </View>
              ))} 
            </View>
            :  
            <View style={styles.options}>
              <View style={[styles.buttonTextContainer, { height: 45, marginBottom: 25 }]}>
                <Text style={styles.buttonText}>{this.props.buttonText}</Text>
              </View>
            </View>
          } 
          <TouchableHighlight style={styles.plusButton} onPress={this.toggleOptions.bind(this)}>
            <Feather name={this.state.showOptions ? 'chevron-down' : defaultIcon} color={Colors.white} size={27} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plusButton: {
    height: 55,
    width: 55,
    backgroundColor: Colors.primaryColor,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nestedButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonGroup: {
    position: 'absolute',
    marginRight: 20,
    borderRadius: 55,
    marginBottom: 10,
    bottom: 0,
    right: 0,
  },
  options: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 130,
  },
  buttonTextContainer: {
    marginBottom: 7,
    height: 35,
    minWidth: 120,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 2,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.secondaryColor,
  },
  buttonOptions: {
    backgroundColor: Colors.darkPrimary,
    borderColor: Colors.secondaryColor,
  },

  buttonText: {
    color: Colors.white,
  },
});

export default AnnotatedDropdown;
