import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"

export function HomeScreen(props) {

    const navigation = useNavigation()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!props.authStatus) {
            //navigation.navigate("Sign In")
            navigation.reset({ index: 0, routes: [{ name: "Sign In" }] })
        }
    }, [props.authStatus])

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
                    />
                    <Text>Location:</Text>
                    <TextInput style={styles.modalInput} />
                    <Text>Item:</Text>
                    <TextInput style={styles.modalInput} />
                    <Text>Amount:</Text>
                    <TextInput style={styles.modalInput} />
                    <View style = {styles.buttonStyle}>
                        <TouchableOpacity
                            onPress={() => setShowModal(false)}
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