import React, {Component} from 'react';
import {Text, StyleSheet, View, Modal, TouchableOpacity} from 'react-native';

export default class HourPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {hour: ''};
  }
  render() {
    const {isVisible, onConfirm, hours} = this.props;
    return (
      <Modal animationType="fade" transparent visible={isVisible}>
        <View style={styles.modalBack}>
          <View style={styles.modal}>
            <View style={styles.hours}>
              {hours.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.hourBtn}
                    onPress={() => this.setState({hour: item})}>
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                onConfirm(this.state.hour);
              }}>
              <Text style={styles.loginText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    height: 26,
    borderRadius: 38,
    marginHorizontal: 68,
    marginBottom: 4,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  modalBack: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'stretch',
    height: '100%',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 5,
  },

  loginText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#e5e9f0',
  },
  hours: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  hourBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: '33.3333%',
  },
  modalText: {
    fontSize: 16,
  },
});
