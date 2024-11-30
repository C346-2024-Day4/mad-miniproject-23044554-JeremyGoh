import React, { useState, useEffect } from 'react';
import { datasource } from './Data'; // Import your data source
import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Edit = ({ route, navigation }) => {
    const { index, type, key, image, ingredients, cookingTime } = route.params;

    // Initialize states with the current recipe data
    const [recipeName, setRecipeName] = useState(key);
    const [imageUrl, setImageUrl] = useState(image);
    const [ingredient, setIngredient] = useState(ingredients);

    // Initialize cookingTime and ensure it's treated as a string with "mins"
    const [dishCookingTime, setDishCookingTime] = useState(cookingTime ? `${cookingTime} mins` : '');

    // Function to handle input change (removing 'mins' and updating state)
    const handleCookingTimeChange = (text) => {
        const time = text.replace('mins', '').trim();
        if (!isNaN(time) && time !== '') {
            setDishCookingTime(`${time} mins`);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Edit Recipe</Text>

                {/* Recipe Name */}
                <Text style={styles.label}>Recipe Name:</Text>
                <TextInput
                    style={styles.input}
                    value={recipeName}
                    onChangeText={setRecipeName}
                />

                {/* Ingredients */}
                <Text style={styles.label}>Ingredients:</Text>
                <TextInput
                    style={styles.inputDescription}
                    value={ingredient}
                    onChangeText={setIngredient}
                />

                {/* Cooking Time */}
                <Text style={styles.label}>Cooking Time:</Text>
                <TextInput
                    style={styles.inputDescription}
                    value={dishCookingTime}
                    onChangeText={handleCookingTimeChange}
                    keyboardType="numeric"
                    placeholder="Enter cooking time (e.g., 15mins)"
                />

                {/* Image URL */}
                <Text style={styles.label}>Image URL:</Text>
                <TextInput
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder="Enter a new image URL"
                />

                {/* Display Image if URL exists */}
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
                ) : (
                    <Text>No image available</Text>
                )}

                {/* Save and Delete Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={() => {
                            let indexnum = 1;
                            if (type === 'Breakfast Recipes') {
                                indexnum = 0;
                            } else if (type === 'Dinner Recipes') {
                                indexnum = 2;
                            }

                            // Update the recipe in the datasource
                            datasource[indexnum].data[index].key = recipeName;
                            datasource[indexnum].data[index].image = imageUrl;
                            datasource[indexnum].data[index].ingredients = ingredient;
                            datasource[indexnum].data[index].cookingTime = dishCookingTime.replace(' mins', ''); // Store as number without 'mins'

                            // Navigate back to the Home screen
                            navigation.navigate("Home");
                        }}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => {
                            let indexnum = 1;
                            if (type === 'Breakfast Recipes') {
                                indexnum = 0;
                            } else if (type === 'Dinner Recipes') {
                                indexnum = 2;
                            }

                            // Confirmation alert before deleting
                            Alert.alert(
                                "Are you sure?",
                                '',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            // Remove the item from datasource
                                            datasource[indexnum].data.splice(index, 1);
                                            navigation.navigate("Home");
                                        },
                                    },
                                    { text: 'No' },
                                ]
                            );
                        }}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>

                    {/* Back Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.backButton]}
                        onPress={() => navigation.goBack()} // Go back to the previous screen (Home)
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EBE0', // Matching background from Home screen
        paddingTop: 30,
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#4F4A43', // Dark brown for title
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#4F4A43', // Dark brown for labels
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#BDC3C7', // Lighter border for inputs
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 15, // Rounded corners for input fields
        backgroundColor: '#FFFFFF',
    },
    inputDescription: {
        height: 100,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 15, // Rounded corners for input fields
        backgroundColor: '#FFFFFF',
    },
    imageStyle: {
        width: 200,
        height: 200,
        marginVertical: 20,
        alignSelf: 'center',
        borderRadius: 15, // Rounded corners for the image
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 30, // Adds space between buttons
    },
    button: {
        width: '45%',
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 14, // Rounded button corners
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    saveButton: {
        backgroundColor: '#B98B57', // Matching muted gold
    },
    deleteButton: {
        backgroundColor: '#E74C3C', // Red for delete
    },
    backButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
        marginBottom: 20, // Adds space between the buttons
        marginTop: 20,
        backgroundColor: '#B98B57', // Blue for back button
    },
    buttonText: {
        color: '#F5EBE0', // Light cream text
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Edit;
