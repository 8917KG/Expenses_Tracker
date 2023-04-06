import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"

export function HomeScreen(props) {

    const navigation = useNavigation()

    const [showModal, setShowModal] = useState(false)
    const [date, setDate] = useState ("")
    const [location, setLocation] = useState ("")
    const [itemType, setItemType] = useState ("")
    const [amount, setAmount] = useState ("")

    useEffect(() => {
        if (!props.authStatus) {
            //navigation.navigate("Sign In")
            navigation.reset({ index: 0, routes: [{ name: "Sign In" }] })
        }
    }, [props.authStatus])

    const saveExpense = () =>{
        setShowModal(false)
        const itemObj = {
            date: date, 
            location: location, 
            itemType: itemType, 
            amount: amount
        }
        props.add(itemObj)
    }

    return (
        <View style={styles.screen}>
            <Text>Welcome To Expense Tracker</Text>

            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.modal}>
                    <Text>Date:</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="dd/mm/yyyy"
                        value={date}
                        onChangeText={(val) => setDate(val)}
                    />
                    <Text>Location:</Text>
                    <TextInput 
                        style={styles.modalInput} 
                        value={location}
                        onChangeText={(val) => setLocation(val)}
                    />
                    <Text>Item:</Text>
                    <TextInput 
                        style={styles.modalInput}
                        value={itemType}
                        onChangeText={(val) => setItemType(val)}
                    />
                    <Text>Amount:</Text>
                    <TextInput 
                        style={styles.modalInput} 
                        value={amount}
                        onChangeText={(val) => setAmount(val)}
                    />
                    <View style = {styles.buttonStyle}>
                        <TouchableOpacity
                            onPress={() => saveExpense()}
                            style={styles.addButton}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowModal(false)}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.buttonText}>Add Expenses</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        padding: 10,
        marginVertical: 10,
        flex: 1
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    screen: {
        justifyContent: "center",
    },
    modal: {
        padding: 10,
        flex: 1,
        justifyContent: "start",
        margin: 10,
        backgroundColor: "lightgreen",
    },
    modalInput: {
        backgroundColor: "white",
        color: "black",
        padding: 10,
    },
    buttonStyle: {
        flexDirection: "row",
    },
    addButton:{
        padding:10,
        backgroundColor: "green",
        flex: 1,
        marginVertical: 10,
    }
})