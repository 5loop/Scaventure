import React from 'react';
import { MapView } from 'expo';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSteps } from '../../actions/questActions';

class QuestStartLocation extends React.Component { 

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  render() {
    const { params } = this.props.navigation.state;
    return (

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
