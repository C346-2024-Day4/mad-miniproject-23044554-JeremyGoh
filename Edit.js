import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { datasource } from './Data'; // Import your data source

const Edit = ({ route, navigation }) => {
    const { index, type, key, description, image } = route.params;

    const [dishName, setDishName] = useState(key); // Pre-fill item name
    const [dishDescription, setDescription] = useState(description); // Pre-fill description
    const [imageUrl, setImageUrl] = useState(image); // Manage image URL state

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Edit Item</Text>


                <Text style={styles.label}>Dish Name:</Text>
                <TextInput
                    style={styles.input}
                    value={dishName}
                    onChangeText={setDishName}
                />


                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.inputDescription}
                    value={dishDescription}
                    onChangeText={setDescription}
                    multiline
                />


                <Text style={styles.label}>Image URL:</Text>
                <TextInput
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={setImageUrl} // Update the image URL
                    placeholder="Enter a new image URL"
                />


                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
                ) : (
                    <Text>No image available</Text>
                )}


                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={() => {
                            let indexnum = 1;
                            if (type === "Asian Cuisine") {
                                indexnum = 0;
                            }


                            datasource[indexnum].data[index].key = dishName;
                            datasource[indexnum].data[index].description = dishDescription;
                            datasource[indexnum].data[index].image = imageUrl;

                            navigation.navigate("Home");
                        }}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => {
                            let indexnum = 1;
                            if (type === "Asian Cuisine") {
                                indexnum = 0;
                            }
                            Alert.alert(
                                "Are you sure?",
                                '',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            datasource[indexnum].data.splice(index, 1); // Delete the item
                                            navigation.navigate("Home"); // Navigate back to Home
                                        },
                                    },
                                    { text: 'No' },
                                ]
                            );
                        }}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1, // Ensure content is scrollable
        justifyContent: 'space-between', // Make sure content is distributed within the screen
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    inputDescription: {
        height: 100,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    imageStyle: {
        width: 200,
        height: 200,
        marginVertical: 20,
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    button: {
        width: '45%',
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#3498DB',
    },
    deleteButton: {
        backgroundColor: '#E74C3C',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Edit;
