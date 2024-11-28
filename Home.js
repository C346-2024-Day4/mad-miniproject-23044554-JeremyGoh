import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SectionList, Button, TouchableOpacity } from 'react-native';
import { datasource } from './Data.js';

const renderSection = ({ section }) => (
    <View style={[styles.headerContainer, { backgroundColor: section.bgcolor }]}>
        <Text style={styles.headerText}>{section.title}</Text>
    </View>
);

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate("Edit", {
                    index: index,
                    type: section.title,
                    key: item.key,
                    ingredients: item.ingredients,
                    image: item.image,
                    cookingTime: item.cookingTime,
                });
            }}
        >
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{item.key}</Text>
                <Text style={styles.ingredientsStyle}>{item.ingredients}</Text>
                <Text style={styles.cookingTimeStyle}>Cooking Time: {item.cookingTime} mins</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={renderSection}
            />
            <View style={styles.buttonContainer}>
                <Button title="Add Item" onPress={() => navigation.navigate("Add")} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',  // Dark background
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#333',  // Dark button background
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#1F1F1F',  // Dark item background
        margin: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    ingredientsStyle: {
        fontSize: 14,
        color: '#b0b0b0',
        marginBottom: 8,
    },
    cookingTimeStyle: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 10,
    },
    priceStyle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#e74c3c',
        textTransform: 'uppercase',
    },
    headerContainer: {
        padding: 25,
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 7,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 3,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',  // Subtle shadow for text
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
        padding: 10,  // Padding around text for spacing
    },
});

export default Home;

//test
