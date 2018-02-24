import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    height:175,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
    width:'100%',
    height:28,
    alignItems: 'center',
    backgroundColor:'#537c8aff',
    marginBottom: 5,
    color:'#ffffff',
    padding:2,

  }, 
  doneButton: {
    borderRadius: 5,
    backgroundColor: '#EAEAEA',
    width:'50%',
    padding: 5,

  },
  playButton: {
    flex:1,
  },
  moreButton: {
    flex:1,
    
  },

  contentRow: {
    flex:1,
    flexDirection: 'row',
    height:'50%',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexWrap: 'wrap',

  },
  description: {
    width:'70%',
    padding:10,
    flexDirection: 'row',
    flexWrap:'wrap',

  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },

  buttonItem: {

    width: '48%',
  },

  icon:{
    width:'30%',
    height:'100%',
    backgroundColor:'#EAEAEA',
  },
});
class QuestRow extends React.Component {

  render() {
    return ( 
      <View style={styles.container}>
      
        <Text style={styles.label}> {this.props.quest.title} </Text>
        
        <View style={styles.contentRow}>
            <View style={styles.icon}>
            
            </View>
            <View style={styles.description}>
              <Text numberOfLines={3} >{this.props.quest.description} </Text>
            </View>
        </View>
        <View style={styles.buttonRow}>
          
          <View style={styles.buttonItem}>
            <Button 
              title="More info" 
              color="#FF9C59" 
              style={styles.moreButton}
              onPress={() => this.props.onInfoBttnPress(this.props.quest)}
            />
          </View>
          
          <View style={styles.buttonItem}>
            <Button 
              title="Play Quest" 
              color="#7bae6dff" 
              style={styles.playButton}
              onPress={() => console.log('To be implemented!')}
            />
          </View>
        
        </View>
      
      </View>
    );
  }
}

export default QuestRow;
