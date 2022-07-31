
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button, TextInput, Alert, Linking, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors, Divider } from 'react-native-paper';
import styles from '../styles/screenStyles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, profilesSelector, addNewProfile, editProfileAndSave } from '../slices/profiles'

function ProfileInput({ name, value, isOptional, inputRef, onChangeProfileText, placeholder, keyboardType = 'default', onSubmitEditing, isAddingProfile, }) {
    // const { field, fieldState } = useController({
    //     control,
    //     name,
    //     rules
    // });
    // console.log('info: ', info);
    return (
        <View style={styles.viewProfile}>
            <View style={styles.titleProfile}>
                <Text style={styles.viewDetailTitle}>
                    {name}
                    {!isOptional && isAddingProfile ? '*' : ''}
                </Text>

            </View>
            <View style={[styles.viewDetailItem]}>
                <TextInput
                    ref={inputRef}
                    //defaultValue={info}
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmitEditing}
                    autoCapitalize='none'
                    returnKeyType='next'
                    //editable={isAddingProfile}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    disabledInputStyle={styles.disableStyle}
                    underlineColor='transparent'
                    onChangeText={onChangeProfileText}
                    style={[styles.inputStyle]}
                    value={value}
                //value={info} 
                />
            </View>
        </View >
    )
}

function ViewDetail({ route, navigation }) {

    const { item, isAddingProfile, profiles } = route.params;
    const [profile, setProfile] = useState(item);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);

    const firstNameInput = useRef(null);
    const lastNameInput = useRef(null);
    const emailInput = useRef(null);
    const phoneInput = useRef(null);

    console.log('item in viewdetail: ', item);

    function onSubmit() {
        console.log('data firstname: ', firstName);
        console.log('data lastname: ', lastName);
        if (firstName != '' && lastName != '') {
            const editOrNewProfile = {
                "id": isAddingProfile ? profiles.length + 1 : item.id,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone
            }
            if (isAddingProfile) {
                console.log('editedProfileToAddNew: ', editOrNewProfile);
                dispatch(addNewProfile(editOrNewProfile));
            } else {
                dispatch(editProfileAndSave(editOrNewProfile));

            }
            console.log('editedProfile: ', editOrNewProfile);


        

        navigation.goBack();
    } else {
        Alert.alert('Form submission error!', 'Please submit all the Main Information fields', [{ text: 'OK' }])
    }

    // dispatch(addNewProfile(profile));
    // navigation.goBack();


}


// useEffect(() => {
//     firstNameInput.current.focus();
// })

return (
    <View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.addDetailView}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <View style={styles.viewDetailTopView}>
                    <Text style={styles.detailHeadingText}>Main Information</Text>
                    <ProfileInput
                        inputRef={firstNameInput}
                        isAddingProfile={isAddingProfile}
                        //onSubmitEditing={() => lastNameInput.current.focus()}
                        placeholder='Enter your First name'
                        onChangeProfileText={e => setFirstName(e)}
                        name='First Name'
                        value={firstName}
                    />
                    <ProfileInput
                        inputRef={lastNameInput}
                        isAddingProfile={isAddingProfile}
                        //  onSubmitEditing={() => emailInput.current.focus()}
                        placeholder='Enter your Last name'
                        onChangeProfileText={e => setLastName(e)}
                        name='Last Name'
                        value={lastName}
                    />
                    <Text style={styles.detailHeadingText}>Sub Information</Text>
                    <ProfileInput
                        inputRef={emailInput}
                        isAddingProfile={isAddingProfile}
                        onSubmitEditing={() => phoneInput.current.focus()}
                        placeholder='Enter your Email'
                        onChangeProfileText={e => setEmail(e)}
                        name='Email'
                        value={email}
                    />
                    <ProfileInput
                        inputRef={phoneInput}
                        keyboardType='phone-pad'
                        isAddingProfile={isAddingProfile}

                        placeholder='Enter your Phone Number'
                        onChangeProfileText={e => setPhone(e)}
                        name='Phone'
                        value={phone}
                    />
                    {/* <Text>top view 11111111111111111</Text>
                        <Text>top view 22222222222222222</Text>
                        <Text>top view 33333333333333333</Text>
                        <Text>top view 44444444444444</Text>
                        <Text>top view 55555555555555555</Text>
                        <Text>top view</Text> */}

                </View>
            </KeyboardAvoidingView>

        </ScrollView>
        <View style={styles.submitButton}>
            <Button
                onPress={() => onSubmit()}
                title="Save Profile"
                color={Colors.white}
                accessibilityLabel="Learn more about this purple button" />
        </View>



    </View>
);
}

export default ViewDetail;