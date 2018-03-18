import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, Alert } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import StepRow from './StepRow';
import Colors from '../../constants/colors';
import AnnotatedButton from '../common/AnnotatedButton';
/* -- Actions */
import { getSteps, deleteStep } from '../../actions/questActions';
import EmptyListScreen from '../common/EmptyListScreen';

const renderIf = require('render-if');

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
descriptionText: {
    fontSize: 16,
    padding: 20,
    color: Colors.black,
  },
});

class QuestStepList extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
    };

    this.onBttnPress = this.onBttnPress.bind(this);
  }

  componentWillReceiveProps(){
    const { quest } = this.props.navigation.state.params;
    this.setState = ({ ds : this.props.getSteps(quest._id) });
  }

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  onBttnPress() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('AddQAStep', {quest});
  }

  onEditBttnPress(step) {
    this.props.navigation.navigate('EditStep', { step });
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

  renderRow(step) {
    return (
      <StepRow 
      step={step} 
      onEditBttnPress={this.onEditBttnPress.bind(this)} 
      onDelBttnPress={this.onDelBttnPress.bind(this)}
      />
      
    );
  }

  renderElement(){
    return <EmptyListScreen 
    title={'There are no steps for this quests!'}
    icon={'alert-circle'} 
    description={'Please add some steps and come back!'}
  />;
   }
 

  render() {
    const ifStepsEmpty = renderIf(this.props.steps.length === 0);
    const ifStepsNotEmpty = renderIf(this.props.steps.length !== 0);
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {ifStepsEmpty(this.renderElement())}      
        {/* {this.props.steps.length === 0 ? this.renderElement() : */}
        {ifStepsNotEmpty(
        <ListView               
        enableEmptySections
        dataSource={this.state.ds.cloneWithRows(this.props.steps)}
        key={this.props.steps}
        renderRow={this.renderRow.bind(this)}
        />
        )}              
        <AnnotatedButton onPress={this.onBttnPress.bind(this)} buttonText={'Add New Step!'} />
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
  return bindActionCreators({ getSteps, deleteStep }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestStepList);