import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight, Alert } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QuestRow from './MyQuestRow';
import Colors from '../../constants/colors';

// Local Imports
import { getMyQuests, deleteQuest } from '../../actions/questActions';
import AnnotatedButton from '../common/AnnotatedButton';

class MyQuestScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { ds };
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
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(this.props.quests)}
          renderRow={this.renderRow.bind(this)}
          key={this.props.quests}
        />
        <AnnotatedButton onPress={this.onBttnPress.bind(this)} buttonText={'Add New Quest!'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 70,
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'flex-start',
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
