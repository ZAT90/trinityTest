import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableWithoutFeedback, KeyboardAvoidingView, RefreshControl } from 'react-native';
import { ActivityIndicator, Colors, FAB, Searchbar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from '../styles/screenStyles';
import { fetchProfiles, profilesSelector, editProfileAndSave, getSearchedProfiles } from '../slices/profiles'


function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { profiles, loading, hasErrors } = useSelector(profilesSelector);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');

    const item = {
        "id": 0,
        "firstName": '',
        "lastName": '',
        "email": '',
        "phone": ''
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
        // if(refreshing) setSearchText('')
        if (loading) return <ActivityIndicator animating={true} color={Colors.red100} />
        if (hasErrors) return <Text>Cannot display profiles...</Text>
        // if (profiles.length == 0) {
        //     return (<Text>No profile available...</Text>)
        // }
        return (
            <View>
                {refreshing ? <ActivityIndicator /> : null}
                <Searchbar
                    placeholder="Search"
                    onChangeText={(e) => {
                        setSearchText(e)
                        if (e != '') {
                            dispatch(getSearchedProfiles(e))
                        } else {
                            dispatch(fetchProfiles())
                        }

                    }}
                    value={searchText}
                />
                {profiles.length == 0 ? <View style={{ width: '100%' }}><Text>No profile available...</Text></View> : <View />}
                <FlatList
                    data={profiles}
                    ItemSeparatorComponent={renderSeparator}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => dispatch(fetchProfiles())} />
                    }
                    renderItem={({ item }, index) => (
                        // console.log('index: ',index)
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('ViewDetail', { item, isAddingProfile: false, profiles, name: 'View/Edit Profile' })}
                        //onPress={() => dispatch(deleteProfile(item, index))}
                        >
                            <View style={styles.listItemView}>
                                <Text style={styles.listItemText}>{item.firstName} {item.lastName}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                    }
                /></View>)
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