import { TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../style/style'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col } from 'react-native-flex-grid';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from '../constants/Game'
import AsyncStorage from '@react-native-async-storage/async-storage'


let board = []

export default Gameboard = ({navigation, route}) => {

    const [playerName, setPlayerName] = useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [gameEndStatus, setGameEndStatus] = useState(false)
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))
    const [dicesPointsTotal, setDicesPointsTotal] = useState( new Array(MAX_SPOT).fill(0))
    const [scores, setScores] = useState([])
    const sumOfPoints = dicesPointsTotal.reduce((a,v) => a + v, 0)
    const [message, setMessage] = useState()
    const [bonus, setBonus] = useState(0)
    

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player)
        } 

    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData()
        });
        return unsubscribe;
      }, [navigation]);

    useEffect(() => {
           
        if (sumOfPoints >= BONUS_POINTS_LIMIT) {
          setBonus(BONUS_POINTS); // Add 50 bonus points
          setMessage('Congrats! You have received 50 bonus points');
        } else {
          setMessage(`You are ${BONUS_POINTS_LIMIT - sumOfPoints} points away from bonus`);
        }
    }, [dicesPointsTotal]);

    function getDiceColor (i) {
        return  (selectedDices[i] ? '#013C58' : '#F5A201')
    }

    const getDicePointsColor = (i) => {
        return  (selectedDicePoints[i] && !gameEndStatus) ? '#013C58' : '#F5A201'
    }

    

    const selectDice = (i) => {
        
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices]
            dices[i] = selectedDices[i] ? false : true
            setSelectedDices(dices)
            console.log(`Dice ${i} selected`)
        }
        else {
            setStatus('You have to throw dices first!')
            setSelectedDices((new Array(NBR_OF_DICES).fill(false)))
        }
    } 

    

    const throwDices = () => {
        console.log('Dices throwed')
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw')
            return 1
        }
        else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false)
            diceSpots.fill(0)
            dicesPointsTotal.fill(0)
        }
        let spots = [...diceSpots]
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1)
                board[i] = 'dice-' + randomNumber
                spots[i] = randomNumber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
        setDiceSpots(spots)
        setStatus('Select and throw dices again')
    }

    

    const selectDicePoints = (i) => {

            if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints]
            let points = [...dicesPointsTotal]
        
            if (!selectedPoints[i]) {
                selectedPoints[i] = true
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
                points[i] = nbrOfDices * (i + 1)
                setNbrOfThrowsLeft(NBR_OF_THROWS)
                setSelectedDices((new Array(NBR_OF_DICES).fill(false)))
            }
            else {
                setStatus('You already selected points for ' + (i + 1))
                return points[i]
            }
            setDicesPointsTotal(points)
            setSelectedDicePoints(selectedPoints)
            console.log(`Points ${i} selected`)
            return points[i]
            
        }
        else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points')
        }
        
    }

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: new Date().toLocaleString(),
            points: (sumOfPoints + bonus)
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
            
        }
        catch (e) {
            console.log('Save error: ' + e)
        }
    }

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue)
                setScores(tmpScores)
            }
        }
        catch (e) {
            console.log ('Read error: ' + e)
        }
    }

    const pointsToSelectRow = []
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++ ) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <TouchableOpacity key={"buttonRow" + diceButton}  onPress={() => selectDicePoints(diceButton)}>
                    <MaterialCommunityIcons 
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    />
                </TouchableOpacity>
            </Col>
        )
    }

    const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++ ) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <TouchableOpacity key={"dice" + dice} onPress={() => selectDice(dice)}>
                    <MaterialCommunityIcons name={board[dice]}
                        key={"dice" + dice}
                        size={50}
                        color={getDiceColor(dice)}
                    />
                </TouchableOpacity>
            </Col>
        )
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++ ) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}
                </Text>
            </Col>
        )
    }

    function getSpotTotal(i) {
        return dicesPointsTotal[i]
    }

    /*console.log(scores) */
   /*  console.log(dicesPointsTotal) */
   /* console.log(sumOfPoints) */

    return (
        <>
            <Header/>
            <View style={style.container}>
            <Container fluid>
                <Row>{dicesRow}</Row>
            </Container>
            <Text>Throws left: {nbrOfThrowsLeft}</Text>
            <Text>{status}</Text>
            <TouchableOpacity style={style.button} onPress={() => throwDices()}>
                <Text style={style.buttonText2}>THROW DICES</Text>
            </TouchableOpacity>
            <Text>Total: {sumOfPoints + bonus}</Text>
            <Text>{message}</Text>
            <Container fluid>
                <Row style={style.pointsRow}>{pointsRow}</Row>
            </Container>
            <Container fluid>
                <Row style={style.pointsToSelect}>{pointsToSelectRow}</Row>
            </Container>
            <TouchableOpacity style={style.button} onPress={() => savePlayerPoints()}>
                <Text style={style.buttonText2}>SAVE POINTS</Text>
            </TouchableOpacity>
            <Text style={style.infoTitle}>Player: {playerName}</Text>
            </View>
            <Footer/>
        </>
    )
}
