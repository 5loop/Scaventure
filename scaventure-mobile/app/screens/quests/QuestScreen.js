import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import QuestRow from './QuestRow';
/* -- Actions */
import { getQuests } from '../../actions/questActions';


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F7F7F7',
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
    alignItems: 'center'
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20
  }
});

class QuestScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        ds: ds
    };
  }

  renderRow(quest) {
    return (
      <QuestRow quest={quest} />
    );
  }
  componentDidMount() {
    this.props.getQuests(); //call our action
  }

  render() {
    return(
      <View style={styles.container}>
      <ListView
        enableEmptySections={true}
        dataSource={this.state.ds.cloneWithRows(this.props.quests)}
        key={this.props.quests}
        renderRow  = {this.renderRow.bind(this)}
      />
      <TouchableHighlight style={styles.button} onPress={this.props.onAddStarted}>
        <Text style={styles.buttonText}>Add New</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

function mapStateToProps(state, props) {
  console.log(state.quests.quests);
  return {
    quests: state.quests.quests
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getQuests }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestScreen);
