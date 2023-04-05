import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"

export function HomeScreen (props) {
    
    const navigation = useNavigation()

    useEffect(() => {
        if( !props.authStatus){
            //navigation.navigate("Sign In")
            navigation.reset({index:0, routes: [{name: "Sign In"}] })
        }
    }, [props.authStatus])

    return(
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity style = {styles.button} onPress = {() => props.signOutHandler()}>
                <Text style = {styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <Text>Add expenses</Text>
            <TouchableOpacity style = {styles.button} onPress={()=>props.add()}>
                <Text style = {styles.buttonText}>Expenses</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        padding:5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
})