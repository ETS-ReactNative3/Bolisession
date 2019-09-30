import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Text,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import GradientButton from '../../components/GradientButton';
import { uploadUsername } from '../../actions/profileActions';

const { height, width } = Dimensions.get('window');

const danceTeams = [
  {
    label: 'SPD',
    value: 'SPD',
  },
  {
    label: 'Bhangra Empire',
    value: 'Bhangra Empire',
  },
];

const CreateAccountScreen = ({ navigation, uploadUsername, userkey }) => {
  // Initial State
  const [currentTeam, setCurrentTeam] = useState('');
  const [username, setUserName] = useState('');
  // Event Handlers
  const handlePress = () => {
    if (username.length > 2) {
      uploadUsername(userkey, username, navigation);
    } else {
      Alert.alert('Username must be minimum 3 characters!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewOne}>
        <Image
          source={require('../../assets/images/logoName.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Create your account</Text>
      </View>
      <View style={styles.viewTwo}>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          onChangeText={input => setUserName(input)}
        />
      </View>
      <View style={styles.viewThree}>
        <RNPickerSelect
          placeholder={{
            label: 'Select a team...',
            value: null,
            color: 'grey',
          }}
          items={danceTeams}
          onValueChange={value => setCurrentTeam(value)}
          value={currentTeam}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
        />
      </View>
      <View style={styles.viewFour}>
        <GradientButton onPress={handlePress} title="CONTINUE" />
      </View>
    </SafeAreaView>
  );
};

CreateAccountScreen.propTypes = {
  uploadUsername: PropTypes.func.isRequired,
  userkey: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  userkey: state.auth.userkey,
});

export default connect(
  mapStateToProps,
  { uploadUsername },
)(CreateAccountScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
  },
  viewOne: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 2.25,
  },
  viewTwo: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width,
    flex: 1.25,
  },
  viewThree: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width,
    flex: 1,
  },
  viewFour: {
    marginTop: height * 0.075,
    width,
    flex: 5,
  },
  image: {
    position: 'absolute',
    top: 0,
    height: 40,
    width: 180,
    marginTop: height * 0.02,
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '85%',
    paddingBottom: '-1%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 4,
  //   color: 'black',
  //   paddingRight: 30, // to ensure the text is never behind the icon
  // },

  inputAndroid: {
    justifyContent: 'flex-end',
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: 'red',
    width: width * 0.85,
    alignItems: 'center',
    paddingBottom: -5,
  },
});
