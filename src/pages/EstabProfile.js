import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import api from '../services/api';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

class EstabProfile extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.photoBack}>
          <View style={{width: '100%', height: '100%'}}>
            <Image
              source={{uri: 'http://192.168.2.125:5000/imgs/mesha.png'}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{marginTop: -120, paddingBottom: 40}}>
            <Image
              source={{uri: 'http://192.168.2.125:5000/imgs/mesha.png'}}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          </View>
        </View>
            <View style={styles.salonDetails}>
            
              <Text style={styles.salonName}>MESHA BEAUTY CONCEPT</Text>
            </View>

            <Text style={styles.titleText}>SALDO</Text>
            <LinearGradient
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={[styles.ballanceBackground, {marginHorizontal: 50}]}>
              <Text style={styles.money}>R$ 482,98</Text>
            </LinearGradient>
          <View>
            <Text style={styles.titleText}>HÓRARIOS MARCADOS</Text>
            <LinearGradient
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <View style={styles.banner}>
                <View style={styles.profileView}>
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSq7eDvrVchpRF4IUrhmDG25F-jOc35GydVFueOgIZvSggMImV',
                    }}
                  />
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.profileInfoRow}>
                    <Text style={styles.profileName}>Luiza Flores</Text>
                  </View>
                  <View style={styles.profileInfoRow}>
                    <Text>11:00</Text>
                  </View>
                </View>
                <Icon
                  name="info"
                  size={36}
                  style={{marginRight: 20}}
                  color="#000"
                />
              </View>
              <View style={styles.banner}>
                <View style={styles.profileView}>
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri:
                        'http://thinkpynk.com/wp-content/uploads/2015/03/ebonyyy1.jpg',
                    }}
                  />
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.profileInfoRow}>
                    <Text style={styles.profileName}>Maria dos Santos</Text>
                  </View>
                  <View style={styles.profileInfoRow}>
                    <Text>13:30</Text>
                  </View>
                </View>
                <Icon
                  name="info"
                  size={36}
                  style={{marginRight: 20}}
                  color="#000"
                />
              </View>
              <View style={styles.banner}>
                <View style={styles.profileView}>
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIuVqMFp6jMvlTesT4xG4aCRaS8Ns3b11k3fgbdHgXhmY_o08c',
                    }}
                  />
                </View>
                <View style={styles.profileInfo}>
                  <View style={styles.profileInfoRow}>
                    <Text style={styles.profileName}>Joana Martins</Text>
                  </View>
                  <View style={styles.profileInfoRow}>
                    <Text>15:45</Text>
                  </View>
                </View>
                <Icon
                  name="info"
                  size={36}
                  style={{marginRight: 20}}
                  color="#000"
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff4',
    alignSelf: 'stretch',
  },
  header: {
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'stretch',
  },
  content: {
    alignSelf: 'stretch',
    flex: 3,
  },
  titleText: {
    fontSize: 18,
    marginTop: 30,

    color: '#0c0c0c',
    fontWeight: '500',
    textAlign: 'center',
  },
  ballanceBackground: {
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 12,
    padding: 10,
    alignItems: 'center',
  },
  cardBackground: {
    borderRadius: 12,
    elevation: 2,
    height: 490,
    marginHorizontal: 12,
    padding: 10,
    alignItems: 'center',
  },
  money: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 26,
  },
  salonDetails: {
    alignItems: 'center',
    borderBottomColor: '#0F0F0F',
    borderBottomWidth: 1,
  },
  salonName: {
    fontSize: 22,
    marginBottom: 30,
  },
  profilePic: {
    height: 128,
    width: 128,
    borderRadius: 64,
    marginBottom: 17,
  },
  banner: {
    margin: 6,
    borderRadius: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    elevation: 1,
    padding: 6,
  },
  profileName: {
    color: '#2e3440',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  profileInfo: {
    justifyContent: 'space-between',
    marginStart: 10,
    marginTop: 10,
    flex: 2,
    alignSelf: 'stretch',
  },
  profileView: {
    alignSelf: 'flex-start',
    borderRadius: 36,
    height: 72,
    width: 72,
    elevation: 3,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignSelf: 'stretch',
    paddingEnd: 15,
  },
  userImage: {
    elevation: 3,
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBack: {
    height: 160,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    zIndex: 3,
  },
});

export default withNavigation(EstabProfile);
