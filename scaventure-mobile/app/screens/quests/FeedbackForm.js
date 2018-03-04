import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Feather } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import { addFeedback } from '../../actions/questActions';

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
    margin: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stars: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
});

class FeedbackForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: '',
      description: '',
      numStars: 5,
      addingFeedback: false,
      errors: { title: null, description: null },
    };

    this.checkTitle = this.checkTitle.bind(this);
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
  
  addFeedback() {
    const errorTitle = this.validateField('title');
    const errorDescription = this.validateField('description');

    if (errorTitle || errorDescription || !this.state.title || !this.state.description) {
      this.setState({ errors: { title: errorTitle, description: errorDescription } });
      return;
    }

    this.setState({ addingFeedback: true });

    const { params } = this.props.navigation.state; 
    this.props.addFeedback(params.questId, {
      title: this.state.title, 
      description: this.state.description, 
      numStars: this.state.numStars,
    }).then(() => {
      this.props.navigation.goBack();
    }).catch(() => {
      console.log('Error')
    }).then(() => {
      this.setState({ addingFeedback: false });
    });
  }

  render() {
    return ( 
      <View style={styles.container}>
        <TextField
          label='Title'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(title) => this.setState({ title })}
          error={this.state.errors.title}
          onBlur={() => this.checkTitle()}
          onFocus={() => this.onFocusTitle()}
          characterRestriction={40}
          maxLength={40}
        />
        <TextField
          label='Description'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(description) => this.setState({ description })}
          multiline
          error={this.state.errors.description}
          onBlur={() => this.checkDescription()}
          onFocus={() => this.onFocusDescription()}
          characterRestriction={300}
          maxLength={300}
        />
        <View style={styles.stars}>
          {[...Array(5)].map((e, i) => 
            (<Feather 
              name="star" 
              color={i + 1 > this.state.numStars ? '#f2ede1' : Colors.yellow} 
              size={27} 
              key={i} 
              onPress={() => this.updateStars(i)} 
            />)
          )}
        </View>

        {this.state.addingFeedback 
          ?
          <ActivityIndicator size="large" color={Colors.primaryColor} /> 
          : 
          <TouchableHighlight style={styles.button} onPress={this.addFeedback.bind(this)}>
            <View>
              <Text style={styles.buttonText}>Add New </Text>
            </View>
          </TouchableHighlight>
        }
      </View>
    );
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFeedback }, dispatch);
}

export default connect(null, mapDispatchToProps)(FeedbackForm);
