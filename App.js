import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TurboModuleRegistry, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
//Screens 
import { HomeScreen } from './Screens/HomeScreen';
import { SignUpScreen } from './Screens/SignUpScreen';
import { SignInScreen } from './Screens/SignInScreen';

//firebase 
import { firebaseConfig } from './config/config';
import {initializeApp} from 'firebase/app';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import {
    getFirestore,
    doc, 
    setDoc,
    collection,
    addDoc
   } from 'firebase/firestore'

const Stack = createNativeStackNavigator();
const FBApp = initializeApp(firebaseConfig)
const FBAuth = getAuth(FBAuth)
const FBdb = getFirestore(FBApp)

export default function App() {

  const [auth, setAuth] = useState()

  onAuthStateChanged(FBAuth, (user) => {
    if(user){
      setAuth(user)
      console.log(user.uid)
    }else{
      setAuth(null)
    }
  })

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBAuth, email, password)
    .then((userCredential) => console.log(userCredential))
    .catch((error) => console.log(error))
  }

  const SignIn = (email,password)=>{
    signInWithEmailAndPassword(FBAuth, email, password)
    .then((userCredential)=> console.log(userCredential))
    .catch((error) => console.log(error))
  }

  const SignOut = () => {
    signOut(FBAuth)
    .then(()=>{

    }).catch ((error) => console.log(error))
  }

  const AddData = async () => {
    const userId = auth.uid
    const path = `userExpenses/${userId}/expenses`
    const data = {id: new Date().getTime(), description: "sample expense"}
    const ref = await addDoc(collection(FBdb, path), data)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up">
          {(props) => <SignUpScreen {...props} handler={SignUp} authStatus = {auth}/>}
        </Stack.Screen>
        <Stack.Screen name="Sign In" >
          {(props) => <SignInScreen {...props} handler ={SignIn} authStatus = {auth}/>}
        </Stack.Screen>
        <Stack.Screen name="Expense Tracker" >
          {(props) => <HomeScreen {...props} authStatus = {auth} signOutHandler = {SignOut} add = {AddData}/>}
        </Stack.Screen>
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
