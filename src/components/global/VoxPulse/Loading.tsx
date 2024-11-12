import { View,  } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <View>
     <LottieView
     source={require('../../../assets/animations/sync.json')}
     autoPlay={true}
     loop
     style={{width:200, height:200}}
     />
    </View>
  )
}

export default Loading