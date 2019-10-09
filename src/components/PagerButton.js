import React, { Component } from 'react'
import { Text, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'

export default class PagerButton extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(prevProps, PrevState){
    return this.props.isOn !== prevProps.isOn
  }
    render() {
    const {isOn} = this.props;
        return (
          <>
              <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={isOn ? styles.buttonSelected : styles.buttonNormal} >
                 <Text style={styles.text}>{this.props.page}</Text>
                </View>
              </TouchableWithoutFeedback>
          </>
        )
    }
}

const styles = StyleSheet.create({

  buttonNormal: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
  buttonSelected: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAA'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FAFAFA'
  }
})