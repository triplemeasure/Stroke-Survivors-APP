
import { StyleSheet, } from 'react-native'
import { pTd } from '../utils/utils'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    cells: {
        marginTop: pTd(30),
        paddingLeft: pTd(30),
        backgroundColor: '#fff'
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: pTd(30),
        paddingHorizontal: pTd(15),
        backgroundColor: '#fff',
        paddingLeft: pTd(25),
    },
    cellIcon: {
        width: pTd(60), height: pTd(60), marginRight:  pTd(40)
    },
    cellText: {
        flex: 1,
        fontSize: pTd(32), color: '#61676F', lineHeight: pTd(60),
    },
    cellExtra: {
        fontSize: pTd(35), color: '#aeaeae', lineHeight: pTd(60),
        fontWeight:'bold',
        marginRight: pTd(30),
    },
    cellBody: {
        flex: 1
    },
    lineBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb"
    },
    lineTop: {
        borderTopWidth: .5,
        borderTopColor: "#ebebeb"
    },
})
