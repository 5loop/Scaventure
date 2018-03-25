import React from 'react';
import { ImageBackground, View, ScrollView, 
  Text, Keyboard, 
  ListView, TouchableHighlight, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Local Imports
import Colors from '../../constants/colors';
import FeedbackRow from './FeedbackRow';
import { getFeedbacks } from '../../actions/questActions';
import EmptyListScreen from '../common/EmptyListScreen';
import AnnotatedButton from '../common/AnnotatedButton';

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
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 20,
    padding: 30,
  },
  h1: {
    fontSize: 22,
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
});

class QuestInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
    };
  }

  componentDidMount() {
    const { quest } = this.props.navigation.state.params;
    this.props.getFeedbacks(quest._id); 
  }
  
  showMap() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('QuestLocation', { longitude: quest.loc.coordinates[1], latitude: quest.loc.coordinates[0] });
  }
  
  startGame() {
    const { quest } = this.props.navigation.state.params;
    this.props.navigation.navigate('QuestStartLocation', { quest });
  }

  renderFeedbackRow(feedback) {
    return (
      <FeedbackRow feedback={feedback} />
    );
  }

  render() {
    const { quest } = this.props.navigation.state.params;
    return ( 
      <View style={styles.container}>

        <ScrollView bounces={false}>
          <ImageBackground
            source={{ uri: 'https://blog.spoongraphics.co.uk/wp-content/uploads/2015/09/thumbnail.jpg' }}
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

  return {
    feedbacks: state.feedbacks.feedbacks,
    feedbacksLoading: state.feedbacks.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFeedbacks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestInfo);
