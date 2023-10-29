import { Text, View, TouchableOpacity } from 'react-native'
import Header from './Header'
import Footer from './Footer'
import style from '../style/style'
/* import Home from './Home'
import Gameboard from './Gameboard' */
import { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from '../constants/Game'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default Scoreboard = ({navigation}) => {

    const [scores, setScores] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getScoreboardData()
        });
        return unsubscribe;
      }, [navigation]);

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                tmpScores.sort((a, b) => b.points - a.points)
                setScores(tmpScores)
            }
        }
        catch (e) {
            console.log ('Read error: ' + e)
        }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear()
            setScores([])
        }
        catch (e) {
            console.log('Clear error: ' + e)
        }
    }

    return (
        <>
            <Header/>
            <View style={{backgroundColor: '#a8e8f9'}}>           
            <Text style={style.infoTitle}>Top 5</Text>
            
            {   scores.length === 0 ? 
                <Text style={style.gameinfo}>Scoreboard is empty</Text>
                : (
                <DataTable>
                    <DataTable.Header style={style.tabelHeader}>
                        <DataTable.Title style={style.cell}><Text style={style.headerTitle}>Rank</Text></DataTable.Title>
                        <DataTable.Title style={style.cell}><Text style={style.headerTitle}>Name</Text></DataTable.Title>
                        <DataTable.Title style={style.cell}><Text style={style.headerTitle}>Date</Text></DataTable.Title>
                        <DataTable.Title style={style.cell}><Text style={style.headerTitle}>Points</Text></DataTable.Title>
                    </DataTable.Header>
                    {scores.map((player, index) => (
                        index < NBR_OF_SCOREBOARD_ROWS && (
                    
                    <DataTable.Row key={player.key} style={style.row}>
                        <DataTable.Cell style={style.cell}><Text>{index + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={style.cell}><Text>{player.name}</Text></DataTable.Cell>
                        <DataTable.Cell style={style.cell}><Text>{player.date}</Text></DataTable.Cell>
                        <DataTable.Cell style={style.cell}><Text>{player.points}</Text></DataTable.Cell>
                    </DataTable.Row>
                    )
                    ))}
                    </DataTable>
                )}
            </View>
            <View style={style.container}>
                <TouchableOpacity style={style.button2} onPress={() => clearScoreboard()}>
                    <Text style={style.buttonText2}>CLEAR SCOREBOARD</Text>
                </TouchableOpacity>
            </View>
            <Footer/>
        </>
    )
}

