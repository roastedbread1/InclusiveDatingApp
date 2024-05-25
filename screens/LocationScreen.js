/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {saveRegistrationProgress} from '../registrationUtils';

const LocationScreen = () => {
  const [location, setLocation] = useState('');
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // const [coordinates] = useState([
  //   {latitude: 12.9716, longitude: 77.5946},
  //   {
  //     latitude: 13.0451,
  //     longitude: 77.6269,
  //   },
  // ]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'DatingApp needs access to your location.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setRegion({...region, latitude, longitude});

              fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}, ${longitude}&key=AIzaSyDOZG27PrHh2pKdCtPzIMR9GA8pxw4AoCE`,
              )
                .then(response => response.json())
                .then(data => {
                  console.log('data', data);
                  if (data.results.length > 0) {
                    setLocation(data.results[0].formatted_address);
                  }
                })
                .catch(error => console.log('error', error));
            },
            error => console.log('Error in getting location', error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('location', location);
  const handleMarkerDragEnd = coordinate => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude}, ${coordinate.longitude}&key=AIzaSyDOZG27PrHh2pKdCtPzIMR9GA8pxw4AoCE`,
    )
      .then(response => response.json())
      .then(data => {
        console.log('New Location', data);
        if (data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          let formattedAddress = '';
          for (let component of addressComponents) {
            if (component.types.includes('route')) {
              formattedAddress += component.long_name + ', ';
            }
            if (component.types.includes('sublocality_level_1')) {
              formattedAddress += component.long_name + ', ';
            }
            if (component.types.includes('locality')) {
              formattedAddress += component.long_name + ', ';
            }
          }
          formattedAddress = formattedAddress.trim().slice(0, -1);
          setLocation(formattedAddress);
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleNext = () => {
    saveRegistrationProgress('Location', {location});
    navigation.navigate('Gender');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons name="location-on" size={26} color="black" />
          </View>
          <View
            style={{
              width: 44,
              height: 44,
              // borderRadius: 22,
              // borderWidth: 2,
              // borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <Entypo name="dots-three-horizontal" size={35} color="black" />
          </View>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 15,
          }}>
          Set your location
        </Text>
        <MapView
          style={{width: '100%', height: 500, marginTop: 20, borderRadius: 20}}
          region={region}>
          <Marker
            onDragEnd={e => handleMarkerDragEnd(e.nativeEvent.coordinate)}
            draggable
            coordinate={region}>
            <View
              style={{
                backgroundColor: 'black',
                padding: 12,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'white',
                }}>
                {location}
              </Text>
            </View>
          </Marker>
        </MapView>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        activeOpacity={0.8}
        style={{marginTop: 30, marginLeft: 'auto'}}>
        <MaterialCommunityIcons
          style={{alignSelf: 'center', marginTop: 20}}
          name="arrow-right-circle"
          size={45}
          color="#581845"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});
