import React, { useState } from 'react';
import { datasource } from './Data.js';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [recipeType, setRecipeType] = useState('Breakfast Recipe');

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Recipe Name:"
                style={styles.input}
                value={recipeName}
                onChangeText={setRecipeName}
            />
            <TextInput
                placeholder="Image URL:"
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <TextInput
                placeholder="Ingredients:"
                style={styles.inputDescription}
                value={ingredient}
                onChangeText={setIngredient}
            />

            <RNPickerSelect
                onValueChange={(value) => setRecipeType(value)}
                value={recipeType}
                items={[
                    { label: 'Breakfast Recipe', value: 'Breakfast Recipe' },
                    { label: 'Lunch Recipe', value: 'Lunch Cuisine' },
                    { label: 'Dinner Recipe', value: 'Dinner Cuisine' },
                ]}
                style={pickerSelectStyles}
            />
            <Button
                title="Submit"
                onPress={() => {
                    let item = {
                        key: recipeName,
                        image: imageUrl,
                        ingredients: ingredient
                    };
                    let indexnum = 1;
                    if (recipeType === "Breakfast Recipe") {
                        indexnum = 0;
                    }
                    datasource[indexnum].data.push(item);
                    navigation.navigate("Home");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    inputDescription: {
        height: 100,
        borderColor: '#BDC3C7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    }
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 5,
        color: 'black',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#BDC3C7',
        borderRadius: 5,
        color: 'black',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
};

export default Add;
