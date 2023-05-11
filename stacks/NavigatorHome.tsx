import {HomeIcon} from 'react-native-heroicons/outline';
import {StarIcon} from 'react-native-heroicons/outline';
import {HomeIcon as HomeIconSolid} from 'react-native-heroicons/solid';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {RocketLaunchIcon} from 'react-native-heroicons/outline';
import {RocketLaunchIcon as RocketLaunchIconSolid} from 'react-native-heroicons/solid';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tw from 'twrnc';
import Home from '../screens/home';
import TopRated from '../screens/topRated';
import Discover from '../screens/discover';
import Modal from '../screens/modal';

  const Tabs = createBottomTabNavigator();

const NavigatorHome = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return focused ? (
              <HomeIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <HomeIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'TopRated') {
            return focused ? (
              <StarIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <StarIcon color={tw.color('gray-400')} size={20} />
            );
          } else if (route.name === 'Discover') {
            return focused ? (
              <RocketLaunchIconSolid color={tw.color('blue-600')} size={20} />
            ) : (
              <RocketLaunchIcon color={tw.color('gray-400')} size={20} />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: tw.color('gray-950'),
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          marginTop: -10,
          marginBottom: 7,
        },
      })}
    >
      <Tabs.Screen
        name={'Home'}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name={'TopRated'}
        component={TopRated}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name={'Discover'}
        component={Discover}
        options={{
          headerShown: false,
        }}
      />
        <Tabs.Screen name="Modal" component={Modal} options={{ tabBarButton: () => null }}/>
    </Tabs.Navigator>
  );
};

export default NavigatorHome;