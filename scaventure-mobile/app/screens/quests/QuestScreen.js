import React from 'react';
import { Text, View, StyleSheet, ListView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import QuestRow from './QuestRow';
import AnnotatedButton from '../common/AnnotatedButton';
import EmptyListScreen from '../common/EmptyListScreen';
import Colors from '../../constants/colors';
/* -- Actions */
import { getQuests, getQuestsNearby } from '../../actions/questActions';

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
      isLoadingMore: false,
      data: props.quests,
      noMoreQuests: false,
      sameLocation: false,
    };

    this.onAddQuestBttnPress = this.onAddQuestBttnPress.bind(this);
  }

  componentDidMount() {
    // this.props.getQuests(); 
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const arrayMarker = [
          { latitude: position.coords.latitude, longitude: position.coords.longitude },
        ];

        this.props.getQuestsNearby({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          .then(() => this.setState({ noMoreQuests: false }))
          .catch(() => this.setState({ noMoreQuests: true }))
          .then(() => this.setState({ isLoadingMore: false }));

        console.log("lat:  " + position.coords.latitude + "  long: "+ position.coords.longitude);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          sameLocation: false,
        });

        if (this.mapRef && arrayMarker.length === 2 && arrayMarker[0].latitude && arrayMarker[1].latitude) {
          this.mapRef.fitToCoordinates(arrayMarker, { edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, animated: false });
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.quests && nextProps.quests.length !== 0) {
      const data = [...this.state.data].concat(nextProps.quests);
      // data.concat(...nextProps.quests);
      console.log("len : " + this.state.data.length);
      this.setState({ data });
    }
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

  _fetchMore() {
    console.log(this.state.data.length);
    this.props.getQuestsNearby({ latitude: this.state.latitude, longitude: this.state.longitude }, this.state.data.length)
      .then(() => this.setState({ noMoreQuests: false }))
      .catch(() => this.setState({ noMoreQuests: true }))
      .then(() => this.setState({ isLoadingMore: false, sameLocation: true }));
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
        {this.props.questsLoading ? 
          <ActivityIndicator size="large" color={Colors.primaryColor} /> 
          :
          <ListView
            enableEmptySections
            dataSource={this.state.ds.cloneWithRows(this.state.data)}
            key={this.state.data}
            renderRow={this.renderRow.bind(this)}
            onEndReached={() =>
              this.setState({ isLoadingMore: true }, () => this._fetchMore())}
            renderFooter={() => {
              return (
                (this.state.isLoadingMore && (!this.state.sameLocation || !this.state.noMoreQuests)) ?
                  <View style={{ flex: 1 }}>
                    <ActivityIndicator size="small" color={Colors.primaryColor} />
                  </View>
                  : 
                  (this.state.noMoreQuests &&
                    <EmptyListScreen 
                      title={'No More Quests Around :('}
                      description={'Please, select a diffrent location!'}
                    />
                  )
              );
            }}
          />
        }
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
  return bindActionCreators({ getQuests, getQuestsNearby }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestScreen);
