import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

// Repara quem eta instanciando a lista e o data={item},entao retorna data
// Para pegar o item que deseja da lista data.profissao
//Em deleta estamos passando props data.key
export default function Lista({ data, deleta,atualiza }) {
  return (
    <View style={styles.container} >

      <TouchableOpacity style={styles.botao} onPress={() => deleta(data.key)}  >

        <Feather name="trash-2" size={20} color="white" />

      </TouchableOpacity>

      <TouchableOpacity onPress={()=>atualiza(data)}>

        <Text style={styles.texto} >{data.nome}</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 33,
    backgroundColor: "black",
    height: 45,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 30,

  },
  botao: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingLeft: 20,

  }




});