import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import QuestRow from './QuestRow';
import AnnotatedButton from '../common/AnnotatedButton';
/* -- Actions */
import { getQuests } from '../../actions/questActions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 70,
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

class QuestScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
    };

    this.onAddQuestBttnPress = this.onAddQuestBttnPress.bind(this);
  }

  componentDidMount() {
    this.props.getQuests(); 
  }

  onAddQuestBttnPress() {
    this.props.navigation.navigate('AddQuest');
  }

  onInfoBttnPress(quest) {
    this.props.navigation.navigate('QuestInfo', { quest });
  }

  onPlayBttnPress(quest) {
    this.props.navigation.navigate('QuestStartLocation', { quest });
  }

  renderRow(quest) {
    return (
      <QuestRow 
        quest={quest} 
        onInfoBttnPress={this.onInfoBttnPress.bind(this)} 
        onPlayBttnPress={this.onPlayBttnPress.bind(this)}
      />
    );
  }
 
  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(this.props.quests)}
          key={this.props.quests}
          renderRow={this.renderRow.bind(this)}
        />
        <AnnotatedButton onPress={this.onAddQuestBttnPress} buttonText={'Add New Quest!'} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    quests: state.quests.quests,
    questsLoading: state.quests.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getQuests }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestScreen);
