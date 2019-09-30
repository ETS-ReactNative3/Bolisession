import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import GradientButton from '../../components/GradientButton';
import { uploadPhotoToFirebase } from '../../actions/profileActions';

const { height, width } = Dimensions.get('window');

const ProfilePhotoScreen = ({
  navigation,
  uploadPhotoToFirebase,
  userkey,
  user,
}) => {
  const { userID } = user;
  // Initial State
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [allowContinue, setAllowContinue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pickerProps = {
    width: 300,
    height: 300,
    cropping: true,
    cropperCircleOverlay: true,
  };
  // Event Handlers
  const handlePhotoUpload = value => {
    const picker = value
      ? ImagePicker.openPicker(pickerProps)
      : ImagePicker.openCamera(pickerProps);
    picker.then(image => {
      setProfilePhoto(image);
      setModalVisible(false);
      setIsLoading(true);
      uploadPhotoToFirebase(image, userkey, userID)
        .then(() => {
          setIsLoading(false);
          setAllowContinue(true);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  const handlePress = () => {
    navigation.navigate('AccountType');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        {!profilePhoto ? (
          <Avatar
            rounded
            size={150}
            icon={{ name: 'ios-camera', type: 'ionicon' }}
            activeOpacity={0.7}
          />
        ) : (
          <Avatar
            rounded
            size={150}
            source={{
              uri: profilePhoto.path,
            }}
          />
        )}
      </View>
      <Text style={styles.text}>Add Profile Picture</Text>
      <Text style={styles.text1}>
        Upload a selfie so your friends know it's you.
      </Text>
      <GradientButton onPress={openModal} title="UPLOAD PROFILE PHOTO" />
      {isLoading && <ActivityIndicator size="large" color="orangered" />}
      {allowContinue && (
        <Text style={styles.text2} onPress={handlePress}>
          CONTINUE
        </Text>
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.viewModal}>
          <GradientButton
            onPress={() => handlePhotoUpload(false)}
            title="USE CAMERA TO TAKE SELFIE"
          />
          <Text style={styles.text2}>OR</Text>
          <Button
            onPress={() => handlePhotoUpload(true)}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            title="UPLOAD FROM GALLERY"
            titleStyle={{ color: 'orangered', fontSize: 18 }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

ProfilePhotoScreen.propTypes = {
  uploadPhotoToFirebase: PropTypes.func.isRequired,
  userkey: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  userkey: state.auth.userkey,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { uploadPhotoToFirebase },
)(ProfilePhotoScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
  },
  container1: {
    alignItems: 'center',
    height: 150,
    width: '100%',
    marginTop: height * 0.05,
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'black',
    marginTop: '4%',
    marginBottom: '10%',
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: '10%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'orangered',
    backgroundColor: 'transparent',
  },
  viewModal: {
    height,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
