import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, Alert } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QuestRow from './MyQuestRow';
import Colors from '../../constants/colors';
import { getMyQuests, deleteQuest } from '../../actions/questActions';

const renderIf = require('render-if');

class MyQuestScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { 
      ds,
      action: 'closed',
    };
  }

  componentDidMount() {
    this.props.getMyQuests(); 
  }

  onBttnPress() {
    this.props.navigation.navigate('AddQuest');
  }

  onInfoBttnPress(quest) {
    this.props.navigation.navigate('QuestInfo', { quest });
  }

  onEditBtnPress() {
    console.warn('to be implemented');
  }

  onDeleteBtnPress(questId) {
    Alert.alert(
      'Warning!',
      'Delete this quest?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.deleteQuest(questId) },
      ],
      { cancelable: true }
    );
  }

  onStepBtnPress(quest) {
    this.props.navigation.navigate('QuestStepList', { quest });
  }

  renderRow(quest) {
    return (
      <QuestRow 
        quest={quest} 
        onInfoBttnPress={this.onInfoBttnPress.bind(this)} 
        onEditBtnPress={this.onEditBtnPress.bind(this)}
        onDeleteBtnPress={this.onDeleteBtnPress.bind(this)}
        onStepBtnPress={this.onStepBtnPress.bind(this)}
      />
    );
  }

  render() {
    const ifEmptyQuest = renderIf(this.props.quests.length === 0);
    const ifNotEmptyQuest = renderIf(this.props.quests.length !== 0);
    return (
      <View style={styles.container}>
        {ifEmptyQuest(<Text style={styles.emptText}>Your quest is empty!</Text>)}
        {ifNotEmptyQuest(
          <ListView
            enableEmptySections
            dataSource={this.state.ds.cloneWithRows(this.props.quests)}
            renderRow={this.renderRow.bind(this)}
            key={this.props.quests}
          />
        )}
        <TouchableHighlight style={styles.button} onPress={this.onBttnPress.bind(this)}>
          <Text style={styles.btnText}>Add New</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    backgroundColor: Colors.primaryColor,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 20,
  },
  emptText: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 30,
  },
});

function mapStateToProps(state) {
  return {
    quests: state.quests.quests,
    questsLoading: state.quests.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyQuests, deleteQuest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestScreen);
