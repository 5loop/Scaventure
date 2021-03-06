import React from 'react';
import { Text, View, StyleSheet, ListView, Button, TextInput, TouchableHighlight } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import MapView from 'react-native-maps';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editQuest } from '../../actions/questActions';
import { Feather } from '@expo/vector-icons';
import MapButton from '../common/MapButton';
import AnnotatedButton from '../common/AnnotatedButton';
import { Label } from 'native-base';

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
    minWidth: 300, 
    minHeight: 500 ,
    flex:1,
    flexDirection: 'column',
    
  },
  maps:{
    flex:1,
    
  },
  mapIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    bottom: 0,
    left: 0,
    padding: 8,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'stretch',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.darkPrimary,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

  
class EditQuest extends React.Component {

  constructor(props, context){    
    super(props, context);
    const { quest } = this.props.navigation.state.params;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds,
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },
      title: quest.title,
      description: quest.description,
      errors: { title: null, description: null },
    };    
  }

  onFocusTitle() {
    this.setState({ errors: { title: null, description: this.state.errors.description } }); 
  }

  onFocusDescription() {
    this.setState({ errors: { title: this.state.errors.title, description: null } }); 
  }

  updateStars(i) {
    this.setState({ numStars: i + 1 });
  }

  validateField(fieldname) {
    const value = this.state[fieldname];
    let error = '';

    if (fieldname === 'title') {
      error = (!value || value.trim() === '') ? 'Title cannot be empty!' : null;
    } else if (fieldname === 'description') {
      error = (!value || value.trim() === '') ? 'Description cannot be empty!' : null;
    }

    return error;
  }

  checkTitle() {
    const error = this.validateField('title');
    this.setState({ errors: { title: error, description: this.state.errors.description } }); 
  }

  checkDescription() {
    const error = this.validateField('description');
    this.setState({ errors: { title: this.state.errors.title, description: error } });  
  }

  // Map Overlay - close
  closeMap() {
    this.setState({ displayMap: false });
  }

  // Map Overlay - open
  openMap() {
    this.setState({ displayMap: true });
  }
  

  componentWillMount(){
    const { quest } = this.props.navigation.state.params;
      if(quest)
      this.setDefaultState(quest);
  }

  componentWillReceiveProps(nextProps){
      this.setDefaultState(nextProps);
  }


  setDefaultState(quest){
    var initialRegion = {
        latitude: quest.loc.coordinates[1],
        longitude: quest.loc.coordinates[0],
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }    
      this.setState({
          title: quest.title,
          description: quest.description,          
          initialPosition: initialRegion,
          markerPosition: initialRegion
      })
  }





  onPress(){
    const { quest } = this.props.navigation.state.params;
    console.log(this.state.x);
    console.log(quest);
    
    const errorTitle = this.validateField('title');
    const errorDescription = this.validateField('description');

    if (errorTitle || errorDescription || !this.state.title || !this.state.description) {
      this.setState({ errors: { title: errorTitle, description: errorDescription } });
      return;
    }

        
    if(this.state.x == undefined) {
      
      

      const data = {
        title: this.state.title,
        description: this.state.description,
        type: "public",
        loc: {
          type: "Point",
          coordinates: [this.state.initialPosition.longitude, this.state.initialPosition.latitude]
        }
      }
      this.props.editQuest(quest._id, data).then(() => {
        console.log(this.props.editedQuest);

       this.props.navigation.navigate('myQuest');
      })


    }else{
      console.log("in the else");

      const data = {
        title: this.state.title,
        description: this.state.description,
        type: "public",
        loc: {
          type: "Point",
          coordinates: [this.state.x.longitude, this.state.x.latitude]
        }
      }
      this.props.editQuest(quest._id, data).then(() => {
        console.log(this.props.editedQuest);
        this.props.navigation.navigate('myQuest');
      })

      
  }

  }
 
 
  render() {
    
    const { quest } = this.props.navigation.state.params;
    let { title } = this.state;
    let { description } = this.state;
    return ( 
        <View style={styles.container}>
        <View>
          <TextField
          label='Title'
          value={title}
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(title)=> this.setState({title})}
          error={this.state.errors.title}
          onBlur={() => this.checkTitle()}
          onFocus={() => this.onFocusTitle()}
          characterRestriction={40}
          maxLength={40}
          
        />
        <TextField
          label='Description'
          value={description}
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          multiline
          onChangeText={(description)=> this.setState({description})}
          error={this.state.errors.description}
          onBlur={() => this.checkDescription()}
          onFocus={() => this.onFocusDescription()}
          characterRestriction={300}
          maxLength={300}

        />
        </View>
        <View  style={{ flexDirection: 'row' }} >
        <View style={styles.mapIconDiv}>
            
            <MapButton 
                  text={'Step Start Location'}
                  onPress={this.openMap.bind(this)}
                />   
            <Text style={{textAlign: 'center'}}>Quest Start Location</Text>
        </View>        
      </View>
      <View>
      <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Done</Text>
        </TouchableHighlight>
        </View>
        {/*
        <MapView
            style={styles.map}
            region={this.state.initialPosition}
            
            initialRegion = {this.state.initialPosition}
            onMapReady={this.onMapReady}
            
           >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              
              onDragEnd={(e) => {
                
                this.setState({ x: e.nativeEvent.coordinate,
                               });                 
              }
              }
              />

           </MapView>*/
        }

        {/* Map Overlay */}
        { this.state.displayMap &&
          <View style={styles.overlay}> 
            <MapView
            closeMap={this.closeMap.bind(this)}
            style={styles.map}
            region={{latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta}}
            
            initialRegion = {{latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude,
                latitudeDelta: this.state.initialPosition.latitudeDelta,
                longitudeDelta: this.state.initialPosition.longitudeDelta}}
            //initialRegion = {this.state.coordinate}
            //onRegionChange={this.state.coordinate}
            >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              region={this.state.coordinate}
              onDragEnd={(e) => {
                
                  //coordinate: {this.state.x}
                
                this.setState({ x: e.nativeEvent.coordinate, initialPosition: e.nativeEvent.coordinate})
                  }
              }
              
            
              
            />

          </MapView>
          <AnnotatedButton 
          color={Colors.green}
          onPress={this.closeMap.bind(this)} 
          icon='check' 
          buttonText="Done!" 
          /> 
          </View>

          
        }
          
      </View> 
    );
  }
}

function mapStateToProps(state){
  console.log(state)
  return{
    editedQuest: state.editedQuest.editedQuest,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editQuest }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditQuest);

