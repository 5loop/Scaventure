import React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    height:175,
  },

  inputStyle: {
    fontSize: 20,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor:'#C0C0C0',
  },

  inputLable: {
    fontSize: 20,
    fontWeight: '300',

    
    
  },

  contentRow: {
    flex:1,
    flexDirection:'row',
    marginBottom: 5,
    flexWrap: 'wrap',
    height:'20%',
    padding:5,

  },
  ip:{
    
    padding: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor:'#C0C0C0',
    backgroundColor:'rgba(61,63,111,0.3)',
    marginBottom:10,
  }

});


class AddQuest extends React.Component {
  render() {
    return ( 
      <View style={styles.container}>
        

          <Text style={styles.inputLable}>Name </Text ><TextInput style={styles.ip} underlineColorAndroid = "rgba(0,0,0,0)" placeholder="title" />
          
          <Text style={styles.inputLable}>Description </Text ><TextInput style={styles.ip} placeholder="Description" placeholderTextColor="#000000" multiline={true} numberOfLines={7}/>
          <Text style={styles.inputLable}>Location </Text ><TextInput style={styles.ip} placeholder="location" />
          
          <View >
            <Button title="Next" color="#7bae6dff" />
          </View>
      </View> 
    );
  }
}

export default AddQuest;
