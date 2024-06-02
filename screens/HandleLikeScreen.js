/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {
  CurrentRenderContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import api from '../api';

const HandleLikeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const createMatch = async () => {
    try {
      const currentUserId = route?.params?.userId;
      const selectedUserId = route?.params?.selectedUserId;

      const response = await api.post('/create-match', {
        currentUserId,
        selectedUserId,
      });

      if (response.status === 200) {
        navigation.goBack();
      } else {
        console.log('error');
      }
    } catch (error) {}
  };

  const match = () => {
    Alert.alert('Matched!', `You and ${route?.params?.name} like each other`, [
      {
        text: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: createMatch,
      },
    ]);
  };
  console.log(route?.params?.imageUrls.slice(4, 7));
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>All {route?.params?.likes}</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
          </Pressable>
        </View>

        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: route?.params?.image}} />
          <View style={styles.viewww}>
            <Text>Liked your photo</Text>
          </View>
        </View>

        <View style={styles.userCard}>
          <>
            <View style={styles.userCardView2}>
              <View style={styles.userCardView3}>
                <Text style={styles.userFirstName}>{route?.params?.name}</Text>
                {/* <View style={styles.userCardView4}>
                  <Text style={styles.userDesc}>new here</Text>
                </View> */}
              </View>
              <View>
                <Entypo name="dots-three-horizontal" size={22} color="black" />
              </View>
            </View>
            <View>
              {route?.params?.imageUrls.length > 0 && (
                <View>
                  <Image
                    source={{uri: route?.params?.imageUrls[0]}}
                    style={styles.userImage}
                  />
                  <Pressable
                    // onPress={() =>
                    //   navigation.navigate('SendLike', {
                    //     image: route?.params?.imageUrls[0],
                    //     name: route?.params?.firstName,
                    //     userId: route?.params?.userId,
                    //     likedUserId: route?.params._id,
                    //   })
                    // }
                    style={styles.likeButton}>
                    <AntDesign name="hearto" size={22} color="#C5B358" />
                  </Pressable>
                </View>
              )}
            </View>

            <View style={styles.userCardView5}>
              {route?.params?.prompts.slice(0, 1).map((prompt, index) => (
                <View key={index}>
                  <View style={styles.promptsView}>
                    <Text style={styles.questionText}>{prompt.question}</Text>
                    <Text style={styles.answerText}>{prompt.answer}</Text>
                  </View>
                  <Pressable style={styles.likeButton}>
                    <AntDesign name="hearto" size={22} color="#C5B358" />
                  </Pressable>
                </View>
              ))}
            </View>

            <View>
              {route?.params?.imageUrls.slice(1, 3).map((image, index) => (
                <View style={styles.imageView} key={index}>
                  <Image
                    key={index}
                    source={{uri: image}}
                    style={styles.userImage}
                  />
                </View>
              ))}
            </View>

            <View style={styles.userCardView5}>
              {route?.params?.prompts.slice(1, 2).map((prompt, index) => (
                <>
                  <View style={styles.promptsView}>
                    <Text style={styles.questionText}>{prompt.question}</Text>
                    <Text style={styles.answerText}>{prompt.answer}</Text>
                  </View>
                  <Pressable style={styles.likeButton}>
                    <AntDesign name="hearto" size={22} color="#C5B358" />
                  </Pressable>
                </>
              ))}
            </View>

            <View>
              {route?.params?.imageUrls.slice(3, 4).map((image, index) => (
                <View style={styles.imageView} key={index}>
                  <Image source={{uri: image}} style={styles.userImage} />
                </View>
              ))}
            </View>

            <View style={styles.userCardView5}>
              {route?.params?.prompts.slice(2, 3).map((prompt, index) => (
                <>
                  <View style={styles.promptsView} key={index}>
                    <Text style={styles.questionText}>{prompt.question}</Text>
                    <Text style={styles.answerText}>{prompt.answer}</Text>
                  </View>
                  <Pressable style={styles.likeButton}>
                    <AntDesign name="hearto" size={22} color="#C5B358" />
                  </Pressable>
                </>
              ))}
            </View>

            <View>
              {route?.params?.imageUrls.slice(4, 7).map((image, index) => (
                <View style={styles.imageView} key={index}>
                  <Image
                    key={index}
                    source={{uri: image}}
                    style={styles.userImage}
                  />
                </View>
              ))}
            </View>
          </>
        </View>
      </ScrollView>

      <Pressable onPress={match} style={styles.pressable}>
        <MaterialCommunityIcons
          style={styles.message}
          name="message-outline"
          size={25}
          color="black"
        />
      </Pressable>
    </>
  );
};

export default HandleLikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 12,
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  imgContainer: {
    marginVertical: 12,
  },
  img: {
    width: '100%',
    borderRadius: 7,
    height: 100,
    resizeMode: 'cover',
  },
  viewww: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 8,
    width: 145,
    bottom: 20,
  },
  message: {
    alignSelf: 'center',
  },
  pressable: {
    position: 'absolute',
    bottom: 75,
    right: 12,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 12,
  },
  userCardView3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userCardView4: {
    backgroundColor: '#452c63',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  userFirstName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  userCard: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  userCardView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userCardView5: {
    marginVertical: 15,
  },
  promptsView: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  answerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  imageView: {
    marginVertical: 10,
  },
});
