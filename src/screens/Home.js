import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { ActivityIndicator, Colors, FAB } from 'react-native-paper';
import styles from '../styles/screenStyles';
import { fetchProfiles, profilesSelector, deleteProfile } from '../slices/profiles'


function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { profiles, loading, hasErrors } = useSelector(profilesSelector);

    const item = {
        "id": 0,
        "name": "",
        "username": "",
        "email": "",
        "address": {
            "street": "",
            "suite": "",
            "city": "",
            "zipcode": "",
            "geo": {
                "lat": "",
                "lng": ""
            }
        },
        "phone": "",
        "website": "",
        "company": {
            "name": "",
            "catchPhrase": "",
            "bs": ""
        }
    };


    useEffect(() => {
        dispatch(fetchProfiles())
    }, [dispatch]);


    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#CED0CE',
                }}
            />
        );
    };

    const FabComponent = () => (
        //  let item = emptyProfile;
        <FAB
            style={styles.fab}
            label='add profile'
            icon="plus"
            onPress={() => navigation.navigate('ViewDetail', { item, isAddingProfile: true, profiles, name: 'Add Profile' })}
        />
    );
    const renderProfiles = () => {
        if (loading) return <ActivityIndicator animating={true} color={Colors.red100} />
        if (hasErrors) return <Text>Cannot display profiles...</Text>
        if (profiles.length == 0) return <Text>No profile available...</Text>
        return <FlatList
            data={profiles}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('ViewDetail', { item, isAddingProfile: false, profiles, name: 'View Profile' })}
                   // onPress={() => dispatch(deleteProfile(item))}
                >
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemText}>{item.username}</Text>
                        <Text style={styles.listItemText2}>{item.email}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
            }
        />
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <View style={styles.homeView}>
                {renderProfiles()}
                {FabComponent()}
            </View>
        </KeyboardAvoidingView>
    );
}

export default HomeScreen;