import React, {Component} from 'react';
import{
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const {width, height} = Dimensions.get('window');

export default class MoviePopup extends Component{
  state = {
    position: new Animated.Value(this.props.isOpen ? 0: height),
    visible: this.props.isOpen,
  };

  componentWillReceiveProps(nextProps){
    if(!this.props.isOpen && nextProps.isOpen){
      this.animateOpen();
    }else if(this.props.isOpen && !nextProps.isOpen){
      this.animateClose();
    }
  }

  animateOpen(){
    this.setState({visible: true},()=>{
      Animated.timing(
        this.state.position,{toValue: 0}
      ).start()

    });
  }
  animateClose(){
    Animated.timing(
      this.state.position, {toValue: height}
    ).start(()=> this.setState({visible: false}));
  }

  render(){
    if(!this.state.visible){
      return null;
    }
    return(
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <Animated.View style={styles.backdrop}/>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.modal,{
          transform: [{ translateY: this.state.position }, { translateX: 0 }]
        }]}>
        <Text>Popup</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
    opacity: 0.5,
  },
  // Popup
  modal: {
    height: height / 2,                 // take half of screen height
    backgroundColor: 'white',
  },
});
