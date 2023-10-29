import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#a8e8f9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#00537A',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: '#00537A',
    flexDirection: 'row',
  },
  title: {
    color: '#ffd35b',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#ffd35b',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    padding: 15
  },
  
  gameinfo: {
    backgroundColor: '#a8e8f9',
    textAlign: 'center',
    justifyContent: 'space-between',
    fontSize: 20,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15
  },
  row: {
    borderWidth: 1, 
    borderColor: '#013c58', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    margin: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#013c58',
    borderRadius: 5
  },
  cell: {
    flex:1, 
    justifyContent: 'center',
  },
  tabelHeader: {
    borderWidth: 1, 
    borderColor: '#013c58', 
    padding: 0, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    margin: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#013c58',
    borderRadius: 5
  },
  headerTitle: {
    fontWeight: 'bold', 
    color: '#00537A',
    fontSize: 14
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#00537A",
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center'
  },
  button2: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#00537A",
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    alignContent: 'center'
  },
  buttonText: {
    color:"#ffd35b",
    fontSize: 20
  },
  buttonText2: {
    color:"#ffd35b",
    fontSize: 15
  },
  input: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
  },
  info: {
    marginLeft: 20, 
    marginRight: 20, 
    marginTop: 5, 
    textAlign: "center"
  },
  infoTitle: {
    textAlign: 'center', 
    margin: 10, 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#013c58'
  },
  pointsToSelect: {
    justifyContent:'space-between', 
    paddingRight: 10,
  },
  pointsRow: {
    paddingLeft: 15, 
    margin: 5, 
    justifyContent: 'space-around', 
    alignItems: 'center'
  }
});