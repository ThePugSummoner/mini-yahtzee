import { Text, View } from 'react-native'
import React from 'react'
import style from '../style/style'

export default function Header () {
    return (
        <View style={style.header}>
            <Text style={style.title}>Mini-Yahtzee</Text>
        </View>
    )
}