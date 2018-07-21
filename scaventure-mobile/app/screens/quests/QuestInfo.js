import React from 'react';
import { ImageBackground, View, ScrollView, 
  Text, TextInput, TouchableOpacity, Alert, AsyncStorage,
  ListView, TouchableHighlight, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local Imports
import { Images } from '../common/Images';
import Colors from '../../constants/colors';
import FeedbackRow from './FeedbackRow';
import { getFeedbacks, getInvitedUsers, sendInvitation,
  deleteInvitedUsers } from '../../actions/questActions';
import EmptyListScreen from '../common/EmptyListScreen';
import AnnotatedButton from '../common/AnnotatedButton';

const renderIf = require('render-if');

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.white,          
  },
  // Background image
  imageBackground: {
    height: 240,
  },
  separator: {
    backgroundColor: Colors.secondaryColor,
    height: 50,
    justifyContent: 'center',
  },
  description: {
    minHeight: 160,
    backgroundColor: Colors.white,
    // borderBottomColor: Colors.secondaryColor,
    // borderBottomWidth: 20,
    padding: 30,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.darkSecondary,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  roundButton: {
    backgroundColor: Colors.primaryColor, // '#68a0cf',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  invitationSection: {
    padding: 5,
    flex: 1,
  },
  inviteUsers: {
    alignItems: 'center',
  },
  userRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  inviteUsersText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.darkSecondary,
  },
  btn: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
  },
  inviteBtn: {
    backgroundColor: Colors.primaryColor,
    width: 70,
    height: 35,
    marginBottom: 10,
    marginTop: 10,
  },
  removeBtn: {
    backgroundColor: Colors.primaryColor,
    width: 70,
    height: 35,
    marginBottom: 10,
    marginTop: 10,
  },
  emailInput: {
    height: 20,
    width: 200,
    marginTop: 10,
    textAlign: 'center',
  },
  userListStyle: {
    margin: 10,
    fontSize: 16,
    color: Colors.darkSecondary,
    textAlignVertical: 'center',
  },
});

class QuestInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
      uid: 0,
    };

    this.removeClick = this.removeClick.bind(this);
  }
  
  componentWillMount() {
    this.getItem('@user:user_id').then((i) => this.setState({ uid: i }));
  }

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getFeedbacks(quest._id); 
    this.props.getInvitedUsers(quest._id);
  }

  async getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      return value;
    } catch (error) {
      console.log(error);
    }
  }

  startGame() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('QuestStartLocation', { quest });
  }

  inviteClick() {
    const email = this.state.inviteEmail;
    const emailREGEX = /\S+@\S+\.\S+/;

    if (emailREGEX.test(String(email).toLowerCase()) === false) {
      Alert.alert('Alert', 'Email is not valid.');
    } else {
      // console.log(this.props);
      const questID = this.props.navigation.state.params.quest._id;
      this.props.sendInvitation(questID, { email });
      Alert.alert('Alert', 'Invitation email sent.');
      console.log('invitation sent.');
    }
  }

  showMap() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('QuestLocation', { longitude: quest.loc.coordinates[0], latitude: quest.loc.coordinates[1] });
  }

  removeClick(key) {
    const questID = this.props.navigation.state.params.quest._id;
    const email = this.props.invitedusers[key].userEmail;

    this.props.deleteInvitedUsers(questID, email);
  }

  renderUserList(arr) {
    const userList = [];
    arr.forEach(element => {
      userList.push(element.userEmail.trim().replace(/@.+\..+/g, ''));
    });
    return userList;
  }

  renderFeedbackRow(feedback) {
    return (
      <FeedbackRow feedback={feedback} />
    );
  }

  render() {
    const { quest } = this.props.navigation.state.params;
    const displayPlayers = this.props.questType !== 'public'
      && this.props.navigation.state.params.quest.createdBy === this.state.uid;
    const ifNotPublicQuest = renderIf(displayPlayers);
    const ifInviNotEmpty = renderIf(displayPlayers && this.props.invitedusers.length !== 0);
    const ifInviIsEmpty = renderIf(displayPlayers && this.props.invitedusers.length === 0);
    const userList = this.renderUserList(this.props.invitedusers);
    const img = Images[parseInt(quest.img)];

    return ( 
      <View style={styles.container}>

        <ScrollView bounces={false}>
          <ImageBackground
            source={img}
            style={styles.imageBackground}
          >
            <View style={styles.buttonGroup}>
              <TouchableHighlight
                style={styles.roundButton}
                underlayColor='#fff'
                onPress={() => this.props.navigation.navigate('FeedbackForm', { questId: quest._id })}
              >
                <Feather name="message-circle" color={Colors.white} size={20} />       
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.roundButton}
                underlayColor='#fff'
                onPress={this.showMap.bind(this)}
              >
                <Feather name="map" color={Colors.white} size={20} />       
              </TouchableHighlight>
            </View>
          </ImageBackground>
          {/* Quest Title */}
          <View style={styles.separator}><Text style={styles.h1}> {quest.title} </Text></View>
          {/* Quest Description */}
          <View style={styles.description}>
            <Text style={styles.descriptionText}> 
              {quest.description}
            </Text>
          </View>
          {/* Players Title */}
          {ifNotPublicQuest(
            <View style={styles.separator}><Text style={styles.h2}> Players </Text></View>
          )}
          {ifInviNotEmpty(
            // not empty
            <View style={styles.invitationSection}>
              {userList.map((item, key) => (
                <View style={styles.userRow}>
                  <Text key={key} style={styles.userListStyle}>Player {key+1}: { item } </Text>
                  <TouchableOpacity 
                    style={[styles.btn, styles.removeBtn]}
                    onPress={() => this.removeClick(key)}
                  >
                    <Text style={styles.btnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.inviteUsers}>
                <Text style={styles.inviteUsersText}> Invite more players. </Text>
                <TextInput
                  style={styles.emailInput}
                  placeholder='email address'
                  onChangeText={(inviteEmail) => this.setState({ inviteEmail })}
                />
                <TouchableOpacity 
                  style={[styles.btn, styles.inviteBtn]}
                  onPress={this.inviteClick.bind(this)}
                >
                  <Text style={styles.btnText}>Invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}          
          {ifInviIsEmpty(
            <View style={styles.inviteUsers}>
              <Text style={styles.inviteUsersText}> No players! Go invite one. </Text>
              <TextInput
                style={styles.emailInput}
                placeholder='email address'
                onChangeText={(inviteEmail) => this.setState({ inviteEmail })}
              />
              <TouchableOpacity 
                style={[styles.btn, styles.inviteBtn]}
                onPress={this.inviteClick.bind(this)}
              >
                <Text style={styles.btnText}>Invite</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Feedback Title */}
          <View style={styles.separator}><Text style={styles.h2}> Feedback </Text></View>
          {this.props.feedbacks.length === 0 
            ?
            <View style={{ marginBottom: 40 }}>
              <EmptyListScreen 
                title={'Be the first Player to Rate this Quest!'}
                icon={'message-circle'} 
                description={'Let other people know how you feel about this challenge!'}
              />
            </View>
            :  
            <ListView
              style={{ marginBottom: 70 }}
              enableEmptySections
              dataSource={this.state.ds.cloneWithRows(this.props.feedbacks)}
              key={this.props.feedbacks}
              renderRow={this.renderFeedbackRow.bind(this)}
            />
          }
        </ScrollView>
        <AnnotatedButton buttonText="Play!" icon="chevron-right" onPress={this.startGame.bind(this)} />
      </View>
    );
  }
}

// export default QuestInfo;

function mapStateToProps(state, props) {
  // console.log(props);
  // console.log(state);
  return {
    feedbacks: state.feedbacks.feedbacks,
    feedbacksLoading: state.feedbacks.loading,
    invitedusers: state.invitedusers.users,
    questType: props.navigation.state.params.quest.type,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getInvitedUsers, getFeedbacks, sendInvitation, deleteInvitedUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestInfo);
