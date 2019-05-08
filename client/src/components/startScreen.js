import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class startScreen extends React.Component {
  // Event Handlers

  constructor() {
    super();
    this.handleSignUpPress = this.handleSignUpPress.bind(this);
  }

  handleSignUpPress = () => this.props.navigation.navigate('phEntry');
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewOne}>
          <Text style={styles.text}>Connect with the</Text>
          <Text style={styles.text1}>Bhangra Community</Text>
          <TouchableOpacity
            onPress={this.handleSignUpPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default startScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    alignContent: 'center',
  },
  viewOne: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1.25,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginBottom: '25%',
  },
  button: {
    width: '80%',
    backgroundColor: 'orangered',
    borderRadius: 32,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '90%',
    paddingVertical: 11,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
