import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview'; 

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnnotatedDropdown from '../common/AnnotatedDropdown';
import AnnotatedButton from '../common/AnnotatedButton';
import EmptyListScreen from '../common/EmptyListScreen';

import Colors from '../../constants/colors';
/* -- Actions */
import { getSteps, deleteStep, reorderSteps, editStep, emailQuestPackage } from '../../actions/questActions';
import StepRow from './StepRow';

const window = Dimensions.get('window');

class QuestStepList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps,
      disableSorting: true,
      oldOrder: props.steps.map(s => s.stepNumber),
    };
  }
  
  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ steps: nextProps.steps, stepsLoading: nextProps.stepsLoading });
  }

  onQABttnPress() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('AddQAStep', { quest });
  }

  onQRBttnPress() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('AddQRStep', { quest });
  }
  onGPSBttnPress() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('AddGPSStep', { quest });
  }

  onEditBttnPress(step) {
    console.log(step);
    if (step.type == "QAStep"){
      console.log("1");
      this.props.navigation.navigate('EditQAStep', { step });
    }
    else if (step.type == "QRStep"){
      console.log("2");
      this.props.navigation.navigate('EditQRStep', { step });
    }
    else if (step.type == "GPSStep"){
      console.log("3");
      this.props.navigation.navigate('EditGPSStep', { step });
    }
  }

  onDelBttnPress(stepId) {
    const { quest } = this.props.navigation.state.params;
    Alert.alert(
      'Warning!',
      'Delete this step?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.deleteStep(quest._id, stepId) },
      ],
      { cancelable: true }
    );
  }

  /**
   * Reorder steps on row moved
   */
  onRowMoved = (e) => {
    const steps = [...this.state.steps];

    if (e.to < e.from) {
      // from top to bottom
      for (let i = e.to; i <= e.from; i++) {
        steps[i].stepNumber += 1;
      }
    } else {
      // from bottom to top
      for (let i = e.from + 1; i <= e.to; i++) {
        steps[i].stepNumber -= 1;
      }
    }

    steps[e.from].stepNumber = e.to;
    steps.sort((obj1, obj2) => obj1.stepNumber - obj2.stepNumber);

    this.setState({ steps });
  }

  toggleReorder = () => this.setState({ disableSorting: !this.state.disableSorting })
  
  // Single row
  _renderRow = (row) => 
    (<StepRow 
      data={row}   
      onEditBttnPress={this.onEditBttnPress.bind(this)} 
      onDelBttnPress={this.onDelBttnPress.bind(this)} 
      disableSorting={this.state.disableSorting}
    />);

  /**
   * Send to backend server
   */
  saveOrder() {
    const { quest } = this.props.navigation.state.params;
   
    // change array to key-value pairs where _id=key, value=stepNumber
    const order = this.state.steps.reduce((map, obj) => {
      map[obj._id] = obj.stepNumber;
      return map;
    }, {});

    this.toggleReorder();
    this.props.reorderSteps(quest._id, order).then(() => {
      console.log('Added!');
    }).catch((e) => {
      console.log(e);
    });
  }

  emailPackage() {
    const { quest } = this.props.navigation.state.params;
    Alert.alert(
      'Quest Package',
      'Do you want to email quest package to yourself?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.emailQuestPackage(quest._id) },
      ],
      { cancelable: true }
    );
    
  }

  render() {
    /* eslint-disable no-nested-ternary */
    const order = this.state.steps.map(s => s.stepNumber);

    return (
      <View style={styles.container}>
        {(!this.props.stepsLoading && this.state.steps && this.state.steps.length !== 0) ?          
          <SortableListView
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={this.state.steps}
            order={order}
            onRowMoved={this.onRowMoved.bind(this)}
            disableSorting={this.state.disableSorting}
            renderRow={this._renderRow} 
          />
          : (this.props.stepsLoading ? 
            <ActivityIndicator size="large" color={Colors.primaryColor} /> 
            :
            <EmptyListScreen 
              title={'No Steps :('}
              description={'Select step type from \'Step Options\' menu & add new step!'}
            />
          )

        }
        <AnnotatedButton color={Colors.green} layout="left" icon="mail" buttonText="Email Me" onPress={this.emailPackage.bind(this)} />
        { this.state.disableSorting ?
          <AnnotatedDropdown 
            onPress={this.onQABttnPress.bind(this)} 
            buttonText={'Step Options'} 
            icon='settings'
            options={['Q/A Step', 'QR Step', 'GPS Step', 'Reorder Steps']} 
            optionFunctions={[this.onQABttnPress.bind(this), this.onQRBttnPress.bind(this),this.onGPSBttnPress.bind(this),this.toggleReorder.bind(this)]}
          />
          :
          <AnnotatedButton color={Colors.green} icon="check" buttonText="Done!" onPress={this.saveOrder.bind(this)} />
        }
      </View>
    );
  }
}
/* eslint-disable */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  list: {
    flex: 1,
    marginTop: 17,
    marginBottom: 50,
  },
  contentContainer: {
    width: window.width,
  },
  text: {
    fontSize: 18,
    color: Colors.darkPrimary,
  },
});

function mapStateToProps(state, props) {
  return {
    steps: state.steps.steps,
    stepsLoading: state.steps.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSteps, deleteStep, reorderSteps, editStep, emailQuestPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestStepList);