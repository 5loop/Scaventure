import React from 'react';
import { MapView } from 'expo';
import { Text, View, StyleSheet, Alert, TouchableHighlight, Clipboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSteps } from '../../actions/questActions';
import Colors from '../../constants/colors';
import commonStypes from '../../styles/common';
import AnnotatedButton from '../common/AnnotatedButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.white,          
    padding: 18,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryColor,
  },
  description: {
    minHeight: 170,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
});

class QuestStartLocation extends React.Component { 
  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  startGame() {
    if (this.props.steps.length !== 0) {
      this.props.navigation.navigate('PlayStep', { steps: this.props.steps, stepIndex: 0 });
    } else {
      Alert.alert(
        'Quest In Progress',
        'The author hasn\'t published any steps yet!',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
    
  }

  _setContent() {
    const { quest } = this.props.navigation.state.params;
    Clipboard.setString(`${quest.loc.coordinates[0]}°, ${quest.loc.coordinates[1]}°`);
  }

  render() {
    const { params } = this.props.navigation.state;
    return ( 
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.h1}>{params.quest.title}</Text>
          <Text> Please, navigate to the quest start location </Text>          
          <TouchableHighlight style={[commonStypes.greenButton, { marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10 }]} onPress={this.startGame.bind(this)}>
            <View>
              <Text style={commonStypes.buttonText}>Start Game!</Text>
            </View>
          </TouchableHighlight>
        </View>
       
        <MapView
          minHeight={100}
          style={{ flex: 1 }}
          initialRegion={{
            longitude: params.quest.loc.coordinates[1],
            latitude: params.quest.loc.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: params.quest.loc.coordinates[0], longitude: params.quest.loc.coordinates[1] }}
          />
        </MapView>
        <AnnotatedButton onPress={this._setContent.bind(this)} buttonText={'Copy location to ClipBoard'} icon='copy' />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    steps: state.steps.steps,
    stepsLoading: state.steps.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSteps }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestStartLocation);
