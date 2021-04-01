import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
  FlatList,
  LogBox,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import firebase from "./src/firebase/firebase"
import Lista from "./src/Lista";

LogBox.ignoreAllLogs.instead;



export default function Registrar() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([""])
  const [key, setKey] = useState('');
  const inputTexto = useRef(null);


  useEffect(() => {

    async function Carregar() {
      await firebase.database().ref('Listagem').on('value', (snapshot) => {
        setLista([]); //tentar manter a moneclatura childItem
        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            //seja criativo, em chidlItem.val().nome 
            //aqui não pode ter relação a sua variavel do array []


          }
          setLista(oldrray => [...oldrray, data])

        })

      })

    }

    Carregar();

  }, [])

  async function adicionar() {
    if (tarefa === '') {
      alert("Coloque algum valor,campo esta vazio");
      return;
    } else {

      if (key !== '') {
        await firebase.database().ref('Listagem').child(key).update({
          nome: tarefa,
        })
        setKey('');
        Keyboard.dismiss();
        return;
      } else {

        let dados = await firebase.database().ref('Listagem');
        let chave = dados.push().key;
        dados.child(chave).set({
          nome: tarefa
        })
        alert("Cadastrado com sucesso");
        setTarefa('');
        Keyboard.dismiss();
      }
    }

  }

  async function deleta(key) {
    await firebase.database().ref('Listagem').child(key).remove();
  }

  //aqui e para enviar ao campo texto para pessoa atualizar,usando
  //com o metodo focus o campo text assim que clicado em algum item vai piscar
  function atualiza(data) {
    setTarefa(data.nome)
    setKey(data.key)
    //para pegar a key do campo e tratar em adicionar,ali verifico se adicino
    //ou dou uptade.
    inputTexto.current.focus();
   
  }

  function novoItem (){
    setKey('');
    setTarefa('');
    Keyboard.dismiss();
  }


  return (
    <View style={styles.container} >
{/*&& singfiica 1então' é util quando deseja renderizar apenas um conteudo
não esquecer de colcoar uma view dentro da renderização se não da erro.*/}   
      {key.length > 0 && (          
        <View style={styles.renderView}>

          <TouchableOpacity onPress={novoItem}>

            <Feather name="x-circle" size={20} color="red" />

          </TouchableOpacity>

          <Text style={styles.renderTexto}>Voce esta editando um arquivo,
         clique no X para começar novo</Text>

        </View>
      )}

      <View style={styles.campoText}>

        <TextInput
          value={tarefa}
          underlineColorAndroid='transparent'
          onChangeText={(item) => setTarefa(item)}
          placeholder="Qual tarefa vai ser adiconado hoje?"
          style={styles.textInput}
          ref={inputTexto}
        />

        <TouchableOpacity style={styles.botao} onPress={adicionar} >

          <Text style={styles.btnTexto} >+</Text>

        </TouchableOpacity>

      </View>

      <FlatList
        style={styles.lista}
        keyExtractor={item => item.key}
        data={lista}
        renderItem={({ item }) => (

          //atraves de deleta={deleta} estamos passando props
          //no componente Lista recebe a props deleta e dentro da props 
          // deleta ou seja deleta={deleta, Aqui estou executando uma função} 
          <Lista data={item} deleta={deleta} atualiza={atualiza} />

        )}

      />

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  campoText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 50,
  },
  textInput: {
    width: '70%',
    height: 50,
    backgroundColor: '#dddd',
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    color: 'black',
    fontSize: 16,

  },
  botao: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTexto: {
    color: 'white',
    fontSize: 45,

  },
  renderView: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom:-50,
    width: '90%',
    height:50,
    marginTop:50,
  },
  renderTexto: {
    color: 'red',
    fontSize: 11,
    padding: 5,

  }




});
