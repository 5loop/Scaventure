import React from 'react';
import { MapView } from 'expo';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSteps } from '../../actions/questActions';
import Colors from '../../constants/colors';
import commonStypes from '../../styles/common';

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
    height: 160,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 20,
    padding: 20,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});

class QuestStartLocation extends React.Component { 

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  render() {
    const { params } = this.props.navigation.state;
    return ( 
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.h1}>{params.quest.title}</Text>
          <Text> Please, navigate to the quest start location </Text>
          {/*}
              <View style={styles.buttonGroup}>
                <TouchableHighlight style={commonStypes.greenButton} >
                  <View>
                    <Text style={commonStypes.buttonText}>I am ready!</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight style={commonStypes.greenButton} >
                  <View>
                    <Text style={commonStypes.buttonText}>I am ready!</Text>
                  </View>
                </TouchableHighlight>
              </View>
          */}
        </View>
        <MapView
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
      </View>
    );
  }
}

function mapStateToProps(state, props) {

  return {
    steps: state.steps.steps,
    stepsLoading: state.steps.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSteps }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestStartLocation);
