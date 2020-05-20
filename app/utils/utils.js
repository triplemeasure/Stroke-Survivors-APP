import {Dimensions} from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
export const ScreenScale = Dimensions.get('window').scale;


const uiWidthPx = 600;  // 设计稿宽度（这里为640px），单位 px
export const pTd = (uiElePx) => { // px 转 dp（设计稿中的 px 转 rn 中的 dp）
    return uiElePx * ScreenWidth / uiWidthPx;
}

export const url = "http://47.103.218.106:2020/";