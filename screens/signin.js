import {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import tw from 'twrnc';

import {EyeIcon} from 'react-native-heroicons/outline';
import {EyeSlashIcon} from 'react-native-heroicons/outline';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  useEffect(() => {
    debounce(emailValidation());
  }, [email]);

  useEffect(() => {
    debounce(passwordValidation());
  }, [password]);

  const emailValidation = () => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || emailRegex.test(email) === false) {
      setIsValidEmail(false);
      return false;
    }
    setIsValidEmail(true);
    return true;
  };

  const passwordValidation = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/i;
                          

    if (!password || passwordRegex.test(password) === false) {
      setIsValidPassword(false)
      return false
    }
    setIsValidPassword(true)
    return true
  }

  // Utility FN · Mover a carpeta utils/utils.js
  const debounce = fn => {
    let id = null;

    return (...args) => {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        fn(...args);
        id = null;
      }, 300);
    };
  };

  const loginUser = () => {
  if (isValidEmail && isValidPassword) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in successfully!');
        // Navigate to the home screen or other desired screen
      })
      .catch(error => {
        console.error(error);
        // Display an error message to the user
      });
  }
};

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
        >
          <View style={tw`py-6 px-8 flex items-center justify-center`}>
            <Image
              source={require('../static/images/Vector.png')}
              style={{ width: 140, height: 37 }}
            />
          </View>
          <View style={tw`flex-1 items-center justify-center px-12`}>
            <Text style={tw`text-white text-2xl mb-12 self-start`}>
              ingresar
            </Text>
            <TextInput
              style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${(!isValidEmail && email !== '') ? 'border border-red-500' : ''}`}
              placeholderTextColor={tw.color('text-white/20')}
              placeholder={'Email'}
              value={email}
              onChangeText={textInput => {
                setEmail(textInput);
              }}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <Text
              style={tw`text-red-500 self-start mb-6 ${
                (isValidEmail || email === '') && 'opacity-0'
              }`}
            >
              email incorrecto.
            </Text>
            <View style={tw`relative flex flex-row`}>
              <Pressable onPress={() => {
                setIsPasswordVisible(!isPasswordVisible)
              }} style={tw`absolute top-3 right-3 z-10`}>
                {!isPasswordVisible? (
                  <EyeSlashIcon style={tw`w-6 h-6 text-white/40`} />
                ) : (
                  <EyeIcon style={tw`w-6 h-6 text-white/40`} />
                )}
              </Pressable>
              <TextInput
                style={tw`h-12 px-4 font-medium bg-white/20 rounded w-full text-white mb-2 ${(!isValidPassword && password !== '') ? 'border border-red-500' : ''}`}
                placeholderTextColor={tw.color('text-white/20')}
                placeholder={'Contraseña'}
                value={password}
                onChangeText={passwordInput => {
                  setPassword(passwordInput)
                }}
                secureTextEntry={!isPasswordVisible}
              />
            </View>
            <Text
              style={tw`text-red-500 self-start mb-6 ${
                (isValidPassword || password === '') && 'opacity-0'
              }`}
            >
              debe contener a-b-0-!
            </Text>
            <Pressable style={tw`mb-12`} onPress={loginUser}>
              <Text style={tw`text-white/40 text-xl`}>ingresar</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('PasswordRecovery')}
              style={tw`mb-16`}
            >
              <Text style={tw`text-white`}>¿olvidaste tu contraseña?</Text>
            </Pressable>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-white`}>¿no tienes una cuenta? </Text>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={tw`text-red-500 font-bold`}>registrate</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
