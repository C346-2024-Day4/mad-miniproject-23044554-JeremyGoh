import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SectionList, TouchableOpacity, Alert } from 'react-native';
import { datasource } from './Data.js';

const renderSection = ({ section }) => (
    <View style={[styles.headerContainer, { backgroundColor: section.bgcolor }]} >
        <Text style={styles.headerText}>{section.title}</Text>
    </View>
);

const Home = ({ navigation }) => {

    const calculateTotalCookingTime = () => {
        let total = 0;
        datasource.forEach(section => {
            section.data.forEach(item => {
                const time = parseInt(item.cookingTime, 10);
                if (!isNaN(time)) {
                    total += time;
                }
            });
        });

        const hours = Math.floor(total / 60);
        const minutes = total % 60;

        Alert.alert(
            "Total Cooking Time",
            `The total cooking time for all recipes is ${hours} hours and ${minutes} minutes.`,
            [{ text: "OK" }]
        );
    };

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
                contentContainerStyle={{ paddingBottom: 150 }}
            />

            <TouchableOpacity
                style={[styles.buttonContainer, { bottom: 80 }]}
                onPress={() => navigation.navigate("Add")}
            >
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.buttonContainer, { bottom: 20 }]}
                onPress={calculateTotalCookingTime}
            >
                <Text style={styles.buttonText}>Calculate Total Cooking Time</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5EBE0',
        paddingTop: 30,
    },
    buttonContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: '#B98B57',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F5EBE0',
        textTransform: 'uppercase',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5EBE0',
        margin: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
        padding: 10,
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 15,
        resizeMode: 'cover',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4F4A43',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    ingredientsStyle: {
        fontSize: 16,
        color: '#B98B57',
        marginBottom: 8,
    },
    cookingTimeStyle: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#B98B57',
        marginBottom: 10,
    },
    headerContainer: {
        padding: 25,
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#B98B57',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 7,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#F5EBE0',
        textAlign: 'center',
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
        padding: 10,
    },
});

export default Home;

