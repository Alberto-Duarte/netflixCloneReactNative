import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import PasswordRecovery from "../screens/passwordRecovery";
import Modal from "../screens/modal";

  const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{
          headerShown: false,
        }}
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="PasswordRecovery"
        options={{
          headerShown: false,
        }}
        component={PasswordRecovery}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;