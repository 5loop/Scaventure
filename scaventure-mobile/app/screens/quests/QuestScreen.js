import React from 'react';
import { Text, View, StyleSheet, ListView, TouchableHighlight } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import QuestRow from './QuestRow';
import Colors from '../../constants/colors';
/* -- Actions */
import { getQuests } from '../../actions/questActions';

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

class QuestScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
    };

    this.onBttnPress = this.onBttnPress.bind(this);
  }

  componentDidMount() {
    this.props.getQuests(); 
  }

  onBttnPress() {
    this.props.navigation.navigate('AddQuest');
  }

  onInfoBttnPress(quest) {
    this.props.navigation.navigate('QuestInfo', { quest });
  }

  renderRow(quest) {
    return (
      <QuestRow quest={quest} onInfoBttnPress={this.onInfoBttnPress.bind(this)} />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(this.props.quests)}
          key={this.props.quests}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableHighlight style={styles.button} onPress={this.onBttnPress.bind(this)}>
          <Text style={styles.buttonText}>Add New</Text>
        </TouchableHighlight>
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
