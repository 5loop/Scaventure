import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/colors';

class StepRow extends Component {
    state = {
      showOptions: false,
    }
  
    toggleOptions() {
      this.setState({ showOptions: !this.state.showOptions }); 
    }
  
    render() {
      const { data } = this.props;
      let icon = 'qrcode';
      let iconSize = 35;
      let borderColor = 'orange';
      if (data.type === 'QAStep') {
        icon = 'question-circle-o';
        borderColor = Colors.lightSecondary;
      } else if (data.type === 'GPSStep') {
        icon = 'map-o';
        iconSize = 27;
        borderColor = Colors.tertiaryColor;
      }

      return (
        <TouchableHighlight
          underlayColor={'#eee'}
          style={styles.rowItem}
          {...this.props.sortHandlers}
          onPress={this.toggleOptions.bind(this)}
        >  
          <View>
            <View style={styles.rowContainer}>
              <View style={{ width: 45, marginRight: 10, borderColor, borderRightWidth: 3, paddingRight: 10 }}>
                <FontAwesome name={icon} size={iconSize} color={borderColor} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.text}>{data.description}</Text>
                {(this.state.showOptions) &&
                  <View style={styles.buttonGroup}>
                    <View style={styles.buttonItem}>
                      <TouchableHighlight 
                        color={Colors.green}
                        style={styles.firstButton}
                        underlayColor={Colors.lightSecondary}
                        onPress={() => this.props.onEditBttnPress(this.props.data)}
                      > 
                        <FontAwesome name={'edit'} size={35} color={Colors.white} />
                      </TouchableHighlight>
                    </View>          
                  
                    <View style={styles.buttonItem}>
                      <TouchableHighlight 
                        color={Colors.lightSecondary}
                        underlayColor={Colors.lightSecondary}
                        style={styles.secondButton}
                        onPress={() => this.props.onDelBttnPress(this.props.data._id)}
                      >
                        <FontAwesome name={'remove'} size={35} color={Colors.white} />
                      </TouchableHighlight>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>
        </TouchableHighlight>
      );
    }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rowItem: 
  {
    paddingRight: 25,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 13,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 14,
    marginLeft: 18,
    marginRight: 18,
  }, 
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
  },
  rowContent: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
  },
  text: {
    fontSize: 18,
    color: Colors.darkPrimary,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  firstButton: {
    backgroundColor: Colors.green,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  secondButton: {
    backgroundColor: Colors.lightSecondary,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
  buttonItem: {
    margin: 3,
    flex: 2,
  },
});

export default StepRow;
