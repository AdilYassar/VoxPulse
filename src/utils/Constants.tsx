import { screenWidth } from './Scaling';


export enum Colors {
    primary = '#4567b7',
    white = '#fff',
    secondry = '#8bc34a',
    secondary2 = '#ffc107',
    secondary3='#b1b1b1',
    border = '#fff',
    text = '#222'
}
export enum Fonts {
    Regular = 'Okra-Regular',
    Medium = 'Okra-Medium',
    Light = 'Okra-MediumLight',
    SemiBold = 'Okra-Bold',
    Theme = 'Bangers-Regular'
}
export const lightColors = [
    'rgba(255,255,255,1)',
    'rgba(255,255,255,0.9)',
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.003)',
];

export const circleRadius = screenWidth* 0.18