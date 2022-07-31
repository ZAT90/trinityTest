
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button, TextInput, Alert, Linking, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors, Divider } from 'react-native-paper';
import styles from '../styles/screenStyles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useForm, useController, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, profilesSelector, addNewProfile } from '../slices/profiles'



function ViewDetail({ route, navigation }) {
    

    
    useEffect(()=> {
        
    })
    
    return (
        <View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.addDetailView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}>
                    <View style={styles.viewDetailTopView}>
                        <Text>top view 11111111111111111</Text>
                        <Text>top view 22222222222222222</Text>
                        <Text>top view 33333333333333333</Text>
                        <Text>top view 44444444444444</Text>
                        <Text>top view 55555555555555555</Text>
                        <Text>top view</Text>

                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
            


        </View>
    );
}

export default ViewDetail;