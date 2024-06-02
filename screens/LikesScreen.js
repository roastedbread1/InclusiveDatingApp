/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LikesScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Recent');
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchReceivedLikes = async () => {
    try {
      const response = await api.get(`/received-likes/${userId}`);
      const receivedLikes = response.data.receivedLikes;

      setLikes(receivedLikes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.text1}>People who liked you</Text>

        {/* <View style={styles.iconView}>
          <SimpleLineIcons name="fire" size={22} color="black" />
          <Text style={{color: 'white'}}>poop</Text>
        </View> */}
      </View>

      <View style={styles.filter}>
        <View style={styles.icon2View}>
          <Ionicons name="filter" size={22} color="black" />
        </View>

        <Pressable
          onPress={() => setOption('Recent')}
          style={[
            styles.pressable,
            {
              borderColor: option === 'Recent' ? 'transparent' : '#808080',
              backgroundColor: option === 'Recent' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pressableText,
              {color: option === 'Recent' ? 'white' : '#808080'},
            ]}>
            Recent
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setOption('Your Type')}
          style={[
            styles.pressable,
            {
              borderColor: option === 'Your Type' ? 'transparent' : '#808080',
              backgroundColor: option === 'Your Type' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pressableText,
              {color: option === 'Your Type' ? 'white' : '#808080'},
            ]}>
            Your Type
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setOption('Last Active')}
          style={[
            styles.pressable,
            {
              borderColor: option === 'Last Active' ? 'transparent' : '#808080',
              backgroundColor:
                option === 'Last Active' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pressableText,
              {color: option === 'Last Active' ? 'white' : '#808080'},
            ]}>
            Last Active
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setOption('Nearby')}
          style={[
            styles.pressable,
            {
              borderColor: option === 'Nearby' ? 'transparent' : '#808080',
              backgroundColor: option === 'Nearby' ? 'black' : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.pressableText,
              {color: option === 'Nearby' ? 'white' : '#808080'},
            ]}>
            Nearby
          </Text>
        </Pressable>
      </View>

      <View>
        {likes?.length > 0 && (
          <Pressable
            onPress={() =>
              navigation.navigate('HandleLike', {
                name: likes[0].userId?.firstName,
                image: likes[0].image,
                imageUrls: likes[0].userId?.imageUrls,
                prompts: likes[0].userId?.prompts,
                userId: userId,
                selectedUserId: likes[0].userId?._id,
                likes: likes?.length,
              })
            }
            style={styles.imgContainer}>
            <View>
              <View style={styles.viewww}>
                <Text>Liked your photo</Text>
              </View>
              <Text style={styles.otherUser}>{likes[0].userId?.firstName}</Text>
              <Image
                style={styles.firstImage}
                source={{uri: likes[0].userId?.imageUrls[0]}}
              />
            </View>
          </Pressable>
        )}
      </View>

      <Text style={styles.more}>More</Text>

      <View style={styles.comments}>
        {likes?.slice(1).map((like, index) => (
          <View key={index} style={styles.comments3}>
            <View style={styles.comments2}>
              {like?.comment ? (
                <View style={styles.viewww}>
                  <Text>{like?.comment}</Text>
                </View>
              ) : (
                <View style={styles.viewww}>
                  <Text>Liked your photo</Text>
                </View>
              )}

              <Text style={styles.otherUser2}>{like?.userId.firstName}</Text>
            </View>
            <View>
              <Image
                style={styles.Image2}
                source={{uri: like?.userId?.imageUrls[0]}}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 15,
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 30,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon2View: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    borderWidth: 0.7,
    padding: 10,
    borderRadius: 20,
  },
  pressableText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  filter: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  otherUser: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  viewww: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 8,
    width: 145,
  },
  firstImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 20,
  },
  imgContainer: {
    padding: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 7,
  },
  more: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  comments: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  otherUser2: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  image2: {
    height: 220,
    width: 180,
    borderRadius: 4,
  },
  comments2: {
    padding: 12,
  },
  comments3: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
});
