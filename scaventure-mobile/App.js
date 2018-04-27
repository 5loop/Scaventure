import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import axios from 'axios';
import store from './app/store';
<<<<<<< HEAD
import Layout from './app/layout';  
import colors from './app/constants/colors';
import { loginUser } from './app/actions/sessionActions';
store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));
//import LoginScreen from '../screens/authentication/LoginScreen';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// global axios settings




// AsyncStorage.getItem('notFirstLaunch').then((value) => launchApp(value));

//var launchApp = function(value){
 // if(value == "true"){

    



  //}

  //else{
   // AsyncStorage.setItem('notFirstLaunch', "true");

 export default class AppIntro extends Component {
    render(){
        //const { navigate } = this.props.navigation;
        return(
            <Navigator initialRoute = {{id: 'Page1'}}
            renderScene = {this.navigatorRenderScene} />
        );
    }

    navigatorRenderScene(route, navigator){
        switch (route.id){
            case 'Page1':
            return(<Page1 navigator = {navigator} />);
            case 'Page2':
            return(<Page2 navigator = {navigator} />);
            case 'Page3':
            return(<Page3 navigator = {navigator} />);
            case 'Page4':
            return(<Page4 navigator = {navigator} />);
            case 'Page5':
            return(<Page5 navigator = {navigator} />);
            case 'Page6':
            return(<Page6 navigator = {navigator} />);
            case 'Page7':
            return(<Page7 navigator = {navigator} />);
            case 'Page8':
            return(<Page8 navigator = {navigator} />);
            case 'Page9':
            return(<Page9 navigator = {navigator} />);
            
            
        }
    }
}

class Page1 extends Component{
    render(){
        
        return(
            

          
            <View style={[styles.bg1, styles.inputMargin]}>
  
            <Image style={styles.logo} source={require('./assets/images/Scaventure1.png')}/>

            <Text style={styles.TitleText}> Welcome To Scaventure </Text>
            

            <Text style={styles.descText}>You are about to embark on a great Adventure!!!  Click Next to start Tour</Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page9'})} >  Skip Tour  </Text>
        
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push ({id: 'Page2'})}> Next Page </Text>
            <Text style={styles.dot}>.</Text>
            
          </View>

        
        );
    }
}

class Page2 extends Component{
    render(){
        return(

            <View style={[styles.bg2]}>

            <Image style={styles.logo1} source={require('./assets/Types.jpeg')}/>

            <Text style={styles.TitleText}>       Types Of Quests </Text>

            <Text style={styles.descText}>There are 2 types of quests Public Quest and Private Quest </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page1'})}>    Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page3'})}>    Next Page </Text>
            <Text style={styles.dot}>.</Text>
            </View>
        );  
    }
}

class Page3 extends Component{
    render(){
        return(

            <View style={[styles.bg3]}>

            <Image style={styles.logo2} source={require('./assets/Public.png')}/>

            <Text style={styles.TitleText}>         Public Quests </Text>
            
            <Text style={styles.descText}>These are Some Pre-Defined Quests available for players to play </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page2'})}>    Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page4'})}>    Next Page </Text>
            <Text style={styles.dot}>.</Text>
            </View>
        );  
    }
}

 

class Page4 extends Component{
    render(){
        return(

            <View style={[styles.bg4]}>

            <Image style={styles.logo3} source={require('./assets/Private.jpeg')}/>

            <Text style={styles.TitleText}>         Private Quests </Text>
            
            <Text style={styles.descText}>This is something unique. It lets you create your own Quest with full control .</Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page3'})}>    Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page5'})}>     Next Page </Text>
            <Text style={styles.dot}>.</Text>
            
            </View>
        );  
    }
}

class Page5 extends Component{
    render(){
        return(

            <View style={[styles.bg2]}>

            <Text style={styles.TitleText}>Ways to complete Quest </Text>

            <Image style={styles.logo2} source={require('./assets/Three.jpeg')}/>
            
            <Text style={styles.descText}> First is through Scanning QR Codes, Second Through GPS and Third through Ques/Ans </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page4'})}> Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page6'})}> Next Page </Text>
            <Text style={styles.dot}>.</Text>
            
            </View>
        );  
    }
}

class Page6 extends Component{
    render(){
        return(

            <View style={[styles.bg1]}>

            <Text style={styles.TitleText}>  Scanning QR Codes </Text>
            
            <Image style={styles.logo4} source={require('./assets/QR.png')}/>

            <Text style={styles.descText}> Scan QR code placed by the owner in order to complete the Quest </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page5'})}> Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page7'})}>  Next Page  </Text>
            <Text style={styles.dot}>.</Text>
            
            </View>
        );  
    }
}

class Page7 extends Component{
    render(){
        return(

            <View style={[styles.bg2]}>

            <Text style={styles.TitleText}>Answering The Questions  </Text>
            
            <Image style={styles.logo5} source={require('./assets/QA.jpeg')}/>

            <Text style={styles.descText}> Answer the Question in order to earn Bonus Points for the Quest </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page6'})}> Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page8'})}>  Next Page  </Text>
            <Text style={styles.dot}>.</Text>
            
            </View>
        );  
    }
}

class Page8 extends Component{
    render(){
        return(

            <View style={[styles.bg3]}>

            <Text style={styles.TitleText}>     GPS Based Quest </Text>
            
            <Image style={styles.logo6} source={require('./assets/GPS.jpeg')}/>

            <Text style={styles.descText}>Once you reach to a designated Spot, Drop the Pin to Finish the Quest </Text>
            
            <Text style={styles.done} onPress = {() => this.props.navigator.push({id: 'Page7'})}> Prev Page </Text>
            
            <Text style={styles.NextPage} onPress = {() => this.props.navigator.push({id: 'Page9'})}>  Start App  </Text>
            <Text style={styles.dot}>.</Text>
            
            </View>
        );  
    }
}

class Page9 extends Component {
    render() {
  
      return (
  
        <Provider store={store}>
          <Layout />
        </Provider>
      );
    }
  }


const styles = StyleSheet.create({

    Btn:
    {
       // backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    },
    
    TitleText: {
    
        fontSize: 22,
        fontWeight: 'bold',
        //fontFamily: 'Arial',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'absolute',
        marginLeft: 55,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginTop: 300,
      },
      descText: {
          
          fontSize: 15,
          color: 'white',
          fontWeight: 'bold',
          //fontFamily: 'Arial',
          marginLeft: 15,
          marginTop: 340,
      },

      done: {
    
          fontSize : 18,
          textAlign: 'left',
          fontWeight: 'bold',
         // fontFamily: 'Arial',
          marginLeft: 15,
          marginTop: 155,
      },
      NextPage: {
        fontSize: 18,
        fontWeight: 'bold',
       // fontFamily: 'Arial',
        textAlign: 'left',
        marginLeft: 250.5,
        marginTop: -22,
      },
      logo:
      {
        marginTop: 200,
        position: 'absolute',
        marginLeft: 50,
      },
      logo1:
      {
        marginTop: 70,
        position: 'absolute',
        marginLeft: 90,
      },
      logo2:
      {
        marginTop: 140,
        position: 'absolute',
        marginLeft: 17,
      },
      logo3:
      {
        marginTop: 120,
        position: 'absolute',
        marginLeft: 32,
      },
      logo4:
      {
        marginTop: 70,
        position: 'absolute',
        marginLeft: 70,
      },
      logo5:
      {
        marginTop: 45,
        position: 'absolute',
        marginLeft: 90,
      },

      logo6:
      {
        marginTop: 110,
        position: 'absolute',
        marginLeft: 25,
      },
      bg1: {
        
        backgroundColor: 'orange', 
       // alignSelf: 'center',
        //flexDirection: 'column',
        //marginTop: 100,
      },
      bg2: {
        backgroundColor: '#a4b602', 
        //marginTop: 100,
      },
      bg3:
      {
        backgroundColor: '#DB4302',
      },
      bg4:
      {
        backgroundColor: '#406E9F',
      },
      dot:
      {
            marginTop: 1000,
      },
});

AppRegistry.registerComponent('AppIntro', () => AppIntro);
//  }
//}
//import Page1 from './app/AppIntroduction/Page1';



/*

import { loginUser } from './app/actions/sessionActions';
store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));
=======
import Layout from './app/layout';

 import { loginUser } from './app/actions/sessionActions';
 store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));
>>>>>>> 833a74348afa3ad685188ca2764ad561e28a293f
// global axios settings
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class AppDrawer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppDrawer', () => AppDrawer);
