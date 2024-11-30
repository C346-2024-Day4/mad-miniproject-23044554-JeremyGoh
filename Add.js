import React, { useState } from 'react';
import { datasource } from './Data.js';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [recipeType, setRecipeType] = useState('Breakfast Recipes');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Recipe</Text>
            <TextInput
                placeholder="Recipe Name:"
                placeholderTextColor="#AAAAAA"
                style={styles.input}
                value={recipeName}
                onChangeText={setRecipeName}
            />
            <TextInput
                placeholder="Image URL:"
                placeholderTextColor="#AAAAAA"
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <TextInput
                placeholder="Ingredients:"
                placeholderTextColor="#AAAAAA"
                style={styles.inputDescription}
                value={ingredient}
                onChangeText={setIngredient}
            />
            <TextInput
                placeholder="Cooking Time:"
                placeholderTextColor="#AAAAAA"
                style={styles.input}
                value={cookingTime}
                onChangeText={setCookingTime}
            />
            <RNPickerSelect
                onValueChange={(value) => setRecipeType(value)}
                value={recipeType}
                items={[
                    { label: 'Breakfast Recipes', value: 'Breakfast Recipes' },
                    { label: 'Lunch Recipes', value: 'Lunch Recipes' },
                    { label: 'Dinner Recipes', value: 'Dinner Recipes' },
                ]}
                style={pickerSelectStyles}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={() => {
                        const item = {
                            key: recipeName,
                            image: imageUrl,
                            ingredients: ingredient,
                            cookingTime: parseInt(cookingTime, 10),
                        };
                        let indexnum = 1; // Default to Lunch Recipe
                        if (recipeType === 'Breakfast Recipes') {
                            indexnum = 0;
                        } else if (recipeType === 'Dinner Recipes') {
                            indexnum = 2;
                        }
                        datasource[indexnum].data.push(item);
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => navigation.goBack()} // Go back to the previous screen (Home)
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5EBE0', // Light cream background
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#4F4A43', // Dark brown for title
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#BDC3C7', // Lighter border
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 15, // Rounded corners
        backgroundColor: '#FFFFFF', // White background for input
        color: '#4F4A43', // Dark text color
    },
    inputDescription: {
        height: 100,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        color: '#4F4A43',
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
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
        marginBottom: 10, // Adds space between the buttons
    },
    submitButton: {
        backgroundColor: '#B98B57', // Muted gold color
    },
    backButton: {
        backgroundColor: '#B98B57', // Lighter muted gold for back button
    },
    buttonText: {
        color: '#F5EBE0', // Light text color
        fontSize: 18,
        fontWeight: '600',
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 15,
        color: '#4F4A43',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 15,
        color: '#4F4A43',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
};

export default Add;
