import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens 
import { HomeScreen } from './Screens/HomeScreen';
import { SignUpScreen } from './Screens/SignUpScreen';
import { SignInScreen } from './Screens/SignInScreen';

//firebase 
import { firebaseConfig } from './config/config';
import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Stack = createNativeStackNavigator();
const FBApp = initializeApp(firebaseConfig)
const FBAuth = getAuth(FBAuth)

export default function App() {

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBAuth, email, password)
    .then((userCredential) => console.log(userCredential))
    .catch((error) => console.log(error))
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up">
          {(props) => <SignUpScreen {...props} handler={SignUp} />}
        </Stack.Screen>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Expense Tracker" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
