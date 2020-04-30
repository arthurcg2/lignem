import { Dimensions, PixelRatio } from 'react-native'
import Orientation from 'react-native-orientation'

export function widthPercentToDP(widthPercent){
    const initial = Orientation.getInitialOrientation();
    const elemWidth = parseFloat(widthPercent)
    let w = null
    if(initial == 'PORTRAIT' || initial == 'PORTRAITUPSIDEDOWN') w = Dimensions.get('window').width
    else w = Dimensions.get('window').height
	return PixelRatio.roundToNearestPixel(w * elemWidth / 100)
}

export function heightPercentToDP(heightPercent){
    const initial = Orientation.getInitialOrientation();
    const elemHeight = parseFloat(heightPercent)
    let h = null
    if(initial == 'PORTRAIT' || initial == 'PORTRAITUPSIDEDOWN') h = Dimensions.get('window').height
    else h = Dimensions.get('window').width
	return PixelRatio.roundToNearestPixel(h * elemHeight / 100)
}