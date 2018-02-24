import React from 'react';
import { ImageBackground, View, ScrollView, Text, ListView, TouchableHighlight, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
// Local Imports
import Colors from '../../constants/colors';
import FeedbackRow from './FeedbackRow';

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
    height: 200,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 20,
    padding: 20,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.black,
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

const quest = {
  _id: '5a6793c1bdd6b53515565ba4',
  title: 'Test Quest',
  description: 'Loremstique convallis erat sit amet pellentesque. Suspendisse ut magna ac nisi bibendum porta eu a neque. Ut fermentum justo aliquam nucus sodales ligula id condimentum. ',
  createdBy: '5a6793b6bdd6b53515565ba3',
  numOfPlayers: 0,
  type: 'public',
  loc: {
    coordinates: [
      43.6532,
      -79.411079,
    ],
    type: 'Point',
  },
  createdAt: '2018-01-23T19:55:27.002Z',
};

const feedbacks = [
  {
    title: 'This quest is meh',
    description: 'Really Mediocre',
    numStars: 2,
  },
  {
    title: 'Could be worse',
    description: 'Needs more qr codes and better description, I cannot read latin!',
    numStars: 4,
  },
];

class QuestInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
    };
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) =>  console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  showMap () {
    this.props.navigation.navigate('QuestLocation', { longitude: quest.loc.coordinates[1], latitude: quest.loc.coordinates[0] });
  }
  
  renderFeedbackRow(feedback) {
    return (
      <FeedbackRow feedback={feedback} />
    );
  }
  render() {
    return ( 
      <ScrollView style={styles.container} bounces={false}>
        <ImageBackground
          source={{ uri: 'https://blog.spoongraphics.co.uk/wp-content/uploads/2015/09/thumbnail.jpg' }}
          style={styles.imageBackground}
        >
          <View style={styles.buttonGroup}>
            <TouchableHighlight 
              style={styles.roundButton}
              underlayColor='#fff'
            >
              <Feather name="play" color={Colors.white} size={20} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.roundButton}
              underlayColor='#fff'
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
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(feedbacks)}
          key={feedbacks}
          renderRow={this.renderFeedbackRow.bind(this)}
        />
      </ScrollView>
    );
  }
}

export default QuestInfo;
