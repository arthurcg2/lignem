import { Dimensions, PixelRatio } from 'react-native'

export function widthPercentToDP(widthPercent){
    const elemWidth = parseFloat(widthPercent)
    const w = Dimensions.get('window').width;
	return PixelRatio.roundToNearestPixel(w * elemWidth / 100)
}

export function heightPercentToDP(heightPercent){
    const elemHeight = parseFloat(heightPercent)
    const h = Dimensions.get('window').height;
	return PixelRatio.roundToNearestPixel(h * elemHeight / 100)
}