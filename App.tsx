/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './stacks/AuthNavigator';
import NavigatorHome from './stacks/NavigatorHome';
import { ToastProvider } from 'react-native-toast-notifications';
import { Modal, Text, View } from 'react-native';
import tw from 'twrnc';
import Profile from './screens/profile';


function App(): JSX.Element {
  const RootStack = createNativeStackNavigator();

  const [loggedIn, setLoggedIn] = useState();

  const onAuthStateChanged = user => {
    setLoggedIn(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <ToastProvider
      placement="top"
      swipeEnabled={true}
      offsetTop={68}
      animationDuration={100}
      duration={4000}
      renderType={{
        info: toast => (
          <View
            style={tw.style(
              'relative flex flex-col w-10/12 pr-4 pl-8 py-3 bg-white rounded-2xl shadow-sm shadow-gray-800 shadow-offset-[0px]/[6px] shadow-radius-2 shadow-opacity-5',
              {borderLeftColor: '#2979FF'},
            )}
          >
            <View style={tw`absolute w-2 h-2 bg-orange-500 rounded-full left-[14px] top-[21px]`}></View>
            <Text style={tw`text-base text-orange-500`}>
              {toast.message}
            </Text>
            <Text style={tw`text-sm text-gray-600`}>
              {toast.data.subtitle}
            </Text>
          </View>
        ),
      }}
    >
    <NavigationContainer>
      <RootStack.Navigator>
        {!loggedIn ? (
        <RootStack.Screen
          name={'Auth'}
          component={AuthNavigator}
          options={{
            headerShown: false,
          }}
        />
        ) : (
                <RootStack.Group>
        <RootStack.Screen
          name={'NavigatorHome'}
          component={NavigatorHome}
          options={{
            headerShown: false,
          }}
        />
              <RootStack.Screen 
                name={'Profile'} 
                component={Profile}
              />
            </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
</ToastProvider>
  );
}

export default App;
