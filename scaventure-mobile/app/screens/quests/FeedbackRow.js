import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colors';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  description: {
    padding: 20,
  },
  separator: {
    backgroundColor: Colors.tertiaryColor,
    height: 20,
    padding: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '300',
    color: Colors.white,
  }, 
  descriptionText: {
    fontSize: 15,
    fontWeight: '100',
  },
});

class FeedbackRow extends React.Component {
  render() {
    return ( 
      <View style={styles.container}>
        <View style={styles.separator}>
          <Text style={styles.title}> {this.props.feedback.title} {' '}
            {[...Array(this.props.feedback.numStars)].map((e, i) => <Feather name="star" color={Colors.white} size={17} key={i} />)}
          </Text>
          
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}> {this.props.feedback.description} </Text>
        </View>
      </View>
    );
  }
} 

export default FeedbackRow;
