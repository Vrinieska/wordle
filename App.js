import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { colors, CLEAR , ENTER} from './src/constants';
import Keyboard from './src/components/Keyboard/Keyboard'

const NUMBER_OF_TRIES = 5

const copyArray = (arr) => {

   return ([...(arr.map((rows) => [...rows]))])
}
export default function App() {
  const word = 'hel'
  const letters = word.split('') //['n', 'a', 'n', 'c', 'y']
  const [rows, setRows] =  useState(
   new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill('')))
  
  const [currentRow, setCurrentRow] = useState(0) 
  const [currentCol, setCurrentCol] = useState(0)
 
  const onKeyPressed = (key) => {
    const updateRows = copyArray(rows)
    if(key ===  CLEAR){
          const prevCol = currentCol - 1
          if(prevCol >= 0){
          updateRows[currentRow][prevCol] = ''
          setRows(updateRows)
          setCurrentCol(prevCol)
         } 
         return
    }
    if(key === ENTER){  
        if(currentCol === rows[0].length){
          setCurrentRow(currentRow +1)
          setCurrentCol(0)
        }
    
      return 
    }
    if(currentCol < letters.length){
        updateRows[currentRow][currentCol] = key
        setRows(updateRows)
        setCurrentCol(currentCol+1)
      }

    }

  const isCellActive = (row,col) => {
     return row === currentRow && col === currentCol
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>Ahorcados</Text>
  
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
              <View key={`row ${i}`} style={styles.row}>
                {row.map((cell, j) => (
                 <View key={`cell ${j}`} style={[styles.cell,{borderColor: isCellActive(i,j)? colors.lightgrey : colors.grey}]}>
                  <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                  </View>
               ))}
            </View>
          ))}
      </ScrollView>

      <Keyboard onKeyPressed={onKeyPressed} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7
  }, 
  map: {
    // backgroundColor:'red',
    alignSelf: 'stretch',
    height: 100,

  },
  row: {
    alignSelf:'stretch',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.grey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
