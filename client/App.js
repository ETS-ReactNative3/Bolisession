import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './src/store/store';
// Authentication Screens
import LandingPageScreen from './src/screens/AuthenticationScreens/LandingPageScreen';
import PhoneNumberScreen from './src/screens/AuthenticationScreens/PhoneNumberScreen';
import PhoneConfirmationScreen from './src/screens/AuthenticationScreens/PhoneConfirmationScreen';
// Initial Profile Construction Screens (Before user can enter HomeScreen)
import CreateAccountScreen from './src/screens/ProfileConstructionScreens/CreateAccountScreen';
import ProfilePhotoScreen from './src/screens/ProfileConstructionScreens/ProfilePhotoScreen';
import AccountTypeScreen from './src/screens/ProfileConstructionScreens/AccountTypeScreen';
// Main Home Screen when user is already logged in
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import UserBioScreen from './src/screens/UserBioScreen';
import SetUpProfileVideo from './src/screens/SetupProfileVideo';
// Screens implementing the Messaging Feature
import MessagingListScreen from './src/screens/MessageScreens/MessagingListScreen';
import PrivateMessageScreen from './src/screens/MessageScreens/PrivateMessageScreen';

// ---------------------------------------------------- //
// Beginning of stack navigators
const LandingPageStack = createStackNavigator({
  Start: {
    screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const PhoneAuthStack = createStackNavigator({
  phone: {
    screen: PhoneNumberScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  codeEntry: {
    screen: PhoneConfirmationScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const CreateAccountStack = createStackNavigator({
  Create: {
    screen: CreateAccountScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ProfilePhoto: {
    screen: ProfilePhotoScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  AccountType: {
    screen: AccountTypeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// ---------- Bottom Tab Navigator Stacks ---------------------
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: UserProfileScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Bio: {
      screen: UserBioScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Video: {
      screen: SetUpProfileVideo,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="ios-contact"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20,
            }}
            onPress={() => navigation.navigate('Profile')}
            color="grey"
            size={36}
          />
        ),
        headerRight: (
          <Icon
            name="md-settings"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
            onPress={() => navigation.navigate('Settings')}
            color="grey"
            size={30}
          />
        ),
      };
    },
  },
);

const MapStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const MessageStack = createStackNavigator({
  Message: {
    screen: MessagingListScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  PrivateMessage: {
    screen: PrivateMessageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// -------- End of Bottom Tab Navigator Stacks

// -------- Below is construction of Bottom Tab Navigator ------------
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-home" color={tintColor} size={30} />
        ),
      },
    },

    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-globe" color={tintColor} size={30} />
        ),
      },
    },
    Message: {
      screen: MessageStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-mail" color={tintColor} size={30} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      showLabel: false,
    },
  },
);

//---------------------------------------------------------------------------

const AppSwitchNavigator = createSwitchNavigator({
  Landing: LandingPageStack,
  Auth: PhoneAuthStack,
  CreateAccount: CreateAccountStack,
  Dashboard: DashboardTabNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
