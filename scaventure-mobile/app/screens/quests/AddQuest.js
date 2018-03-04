import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import MapView from 'react-native-maps';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addQuest } from '../../actions/questActions';


const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATTITUDE_DELTA = 0.03
const LONGTITUDE_DELTA = 0.03

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.white,          
    padding: 18,
  },
  button: {
    height: 38,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryColor,
    margin: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
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
  },
  map: {
    
    left:4,
    right:0,
    
   
    
    flex:1,
    flexDirection: 'column',
  },
  maps:{
    flex:1,
    
  }

});

  
class AddQuest extends React.Component {

  constructor(props){
    super(props)

    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      }
    }
  }

  

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})

      
    }, (error)=> alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000, maximumAge:1000})

    this.watchID 
    
    
  }

  onPress(){

    if(this.state.x.latitude == undefined) {
      
      const data = {
        title: this.state.title,
        description: this.state.description,
        type: "public",
        loc: {
          type: "Point",
          coordinates: [this.state.initialPosition.latitude, this.state.initialPosition.longitude]
        }
      }
    }else{
    
      const data = {
        title: this.state.title,
        description: this.state.description,
        type: "public",
        loc: {
          type: "Point",
          coordinates: [this.state.x.latitude, this.state.x.longitude]
        }
      }
      this.props.addQuest(data).then(() => {
        console.log("Add Quest");
      })

      this.props.navigation.navigate('AddQAStep');
  }

  }
 
 
  render() {
    
    
    return ( 
      <View style={styles.container}>
        
          <View>
          <TextField
          label='Title'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(title)=> this.setState({title})}
        />
        <TextField
          label='Description'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          multiline
          onChangeText={(description)=> this.setState({description})}

        />
          </View>
            <MapView
            style={styles.map}
            region={this.state.initialPosition}
            
            initialRegion = {this.state.initialPosition}
            
            
           >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              
              onDragEnd={(e) => {
                
                this.setState({ x: e.nativeEvent.coordinate, initialPosition: e.nativeEvent.coordinate})
                  }
              }
              region={this.state.coordinate}
            
              
            />

           </MapView>
          <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Add New</Text>
        </TouchableHighlight>
      </View> 
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addQuest }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddQuest);
