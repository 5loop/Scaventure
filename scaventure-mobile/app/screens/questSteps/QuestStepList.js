import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import StepRow from './StepRow';
import Colors from '../../constants/colors';
/* -- Actions */
import { getSteps } from '../../actions/questActions';

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

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getSteps(quest._id); 
  }

  onBttnPress() {
    this.props.navigation.navigate('AddStep');
  }

  onEditBttnPress(step) {
    this.props.navigation.navigate('EditStep', { step });
  }

  onDelBttnPress(step) {
    this.props.navigation.navigate('DeleteStep', { step });
  }

  renderRow(step) {
    return (
      <StepRow step={step} onEditBttnPress={this.onEditBttnPress.bind(this)} />
    );
  }

  render() {
    //const { steps } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(this.props.steps)}
          key={this.props.steps}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={this.onBttnPress.bind(this)}>Add New</Text>
        </TouchableHighlight>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestStepList);