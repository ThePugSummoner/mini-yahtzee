import { useState } from "react";
import { TextInput, View, Text, Keyboard, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game'
import style from "../style/style";
import Header from "./Header";
import Footer from "./Footer";


export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)
    

    const handlePlayerName = (value) => {
        if(value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return (
        <>
            <Header/>
            <View style={style.gameinfo}>
                <MaterialCommunityIcons name="information" size={70} color='#F5A201' style={{paddingTop: 0, marginTop: 0}}/>
                {hasPlayerName ?
                <>
                    <Text style={style.infoTitle}>Rules of the game</Text>
                    <Text multiline={true} style={style.info}>
                        THE GAME: Upper section of the classic Yahtzee dice game. 
                        You have {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS} throws. 
                        After each throw you can keep dices in order to get same dice spot counts as many as possible. 
                        In the end of the turn you must select your points from {MIN_SPOT} to {MAX_SPOT}. 
                        Game ends when all points have been selected. The order for selecting those is free.
                    </Text>
                    <Text multiline={true} style={style.info}>
                        POINTS: After each turn game calculates the sum for the dices you selected. 
                        Only the dices having the same spot count are calculated. Inside the game you can not 
                        select same points from {MIN_SPOT} to {MAX_SPOT} again. 
                    </Text>
                    <Text multiline={true} style={style.info}>
                        GOAL: To get points as much as possible. 
                        {BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives you {BONUS_POINTS} points more.
                    </Text>
                    <Text style={style.infoTitle}>Good luck, {playerName}</Text>
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                        <Text style={style.buttonText}>PLAY</Text>
                    </TouchableOpacity>
                </> 
                :
                <>
                    <Text style={style.info}>For scoreboard enter your name...</Text>
                    <TextInput style={style.input} onChangeText={setPlayerName} autoFocus={true}/>
                    <TouchableOpacity style={style.button} onPress={() => handlePlayerName(playerName)}>
                        <Text style={style.buttonText}>OK</Text>
                    </TouchableOpacity>
                </> 

                }
            </View>
            <Footer/>
        </>
    )
}