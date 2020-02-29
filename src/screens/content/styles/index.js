import { StyleSheet, Dimensions } from 'react-native';

export const generateStyles = theme => {
    return StyleSheet.create({
        view: {
            backgroundColor: theme.colors.background,
            borderRadius: 10,
        },
        image: {
            width: 200,
            height: 200,
            left: Dimensions.get('window').width / 2 - 110,
            marginVertical: 10,
            resizeMode: 'contain',
        },
        paragraph: {		
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 6,
            paddingHorizontal: 15,
        },
        list: {
            paddingVertical: 6,
            paddingLeft: 6,
        },
        heading1: {
            fontSize: 32,
            alignSelf: 'center',
            fontWeight: '600',
            paddingBottom: 10,
            shadowColor: theme.colors.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            color: theme.colors.background,
            backgroundColor: theme.colors.primary,
            width: '100%',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
        },
        heading2: {
            fontSize: 24,
            color: theme.colors.text,
            paddingHorizontal: 10,
            marginVertical: 10,
            width: '100%',
            borderColor: theme.colors.primary,
            borderBottomWidth: 2,
        },
        heading3: {
            fontSize: 20,
            color: theme.colors.text,
            paddingHorizontal: 10,		
        },
        link: {
            color: theme.colors.primary,
            textDecorationLine: 'underline',
        },
        mailTo: {
            color: theme.colors.primary,
            textDecorationLine: 'underline',
        },
    });
}