import React,{Component} from 'react';
import {StyleSheet,Text,TouchableOpacity,TextInput,View,Image} from 'react-native';
import {Header} from 'react-native-elements';
import dictionary from '../database'

export default class HomeScreen extends Component{
    constructor(){
      super();
      this.state={
        text: '',
       
        examples: '',

      }
    }
    
    getWord=(text)=>{
     var text = text.toLowerCase();
      try{
        var word =dictionary[text]["word"]
        var lexicalCategory=dictionary[text]["lexicalCategory"]
        var definition=dictionary[text]["definition"]
         this.setState({
           "word": word,
           "lexicalCategory": lexicalCategory,
           "definition": definition
                })
      }
       catch(err){
        alert("This Word Is Not Available For Now");
        this.setState({
          text:'',
          isSearchPressed: false,

        })
       }

    }
    
    render(){
      return(
        <View style={styles.container}>      
          <Header  
             backgroundColor={'#A020F0'}
         centerComponent={{text:'Pocket-Dictionary',style:{color:'#fff',fontSize:20},}}     
         />
          <Image style={styles.iconStyle}
            source={{
              uri:'https://sites.fas.harvard.edu/~jlp/Lesson/Conjugation/Images/dictionary.gif'
            }}   
          />
        <TextInput
          style={styles.inputBox}
           onChangeText={text=>{
            this.setState({
              text: text,
              isSearchPressed: false,
              word: "Loading....",
              lexicalCategory:'',
              examples: [],
              definition: ""
            })
           }}
        />
        <TouchableOpacity
          style={styles.searchButton} 
          onPress={ ()=> {
           this.setState({isSearchPressed: true});
           this.getWord(this.state.text)
          }}  
        >  
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
         

        <View>
          <Text>{
            this.state.isSearchPressed && this.state.word === "Loading...."
            ?this.state.word
            :""
          }</Text>
        </View>
        
         <View>
         <Text>Word :{""} </Text>
         <Text style={{fontSize:18}}>{this.state.word}</Text>
         </View>

         <View>
         <Text>Type :{""}</Text>
         <Text style={{fontSize:18}}>{this.state.lexicalCategory}</Text>
         
         </View>

         <View>
         <Text>Definition :{""}</Text>         
         <Text style={{fontSize:18}}>{this.state.definition}</Text>
         </View>


        </View>
      )
    }
}
const styles = StyleSheet.create({
 container: {
    flex: 1,
  },
  inputBoxContainer:{
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox:{
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  
  searchButton:{
        width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    margin: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2 
  },
  buttonText:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  displayText:{
    fontSize: 30,
    textAlign: 'center',

  },
   iconStyle: {
    width: 150,
    height:150,
    marginLeft: 75,
    marginTop: 50
  },
  
});
