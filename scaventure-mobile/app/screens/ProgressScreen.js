import React from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* -- Local imports -- */
/* ------------------- */
import ProgressRow from './ProgressRow';
/* -- Actions */
import { getProgress } from '../actions/questActions';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
});

class ProgressScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { ds };
  }

  componentDidMount() {
    this.props.getProgress(); 
  }

  renderRow(progress) {
    return (
      <ProgressRow progress={progress} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.state.ds.cloneWithRows(this.props.progress)}
          key={this.props.progress}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    progress: state.progress.progress,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProgress }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressScreen);
