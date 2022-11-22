import React, { useState, useEffect, Component } from 'react';
import { Text, View, Button, Image, FlatList, ScrollView,
         TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { css } from '../../../assets/css/Css';

export default function Search({navigation}) {

  const [items, setItems] = useState([]);

  let key = items.length;

  const [inputValue, setInputValue] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(3);

  const handleAddButtonClick = () => {
    if (inputValue != '') {
      const newItem = {
        itemName: inputValue,
        quantity: 1,
        key: ++key
      };

      const newItems = [...items, newItem];
      setItems(newItems);

      setInputValue('');
      setInputQuantity('');
      calculateTotal();
    }
  }

  const handleRemoveButtonClick = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  }

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    if (newItems[index].quantity == 1) {
      handleRemoveButtonClick(index);
    }
    else {
      newItems[index].quantity--;
      setItems(newItems);
      calculateTotal();
    }
  }

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  }

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  }

  return(
    <View style={css.container}>
      <View style={{marginTop: 70, alignItems: 'center'}}>
        <Text style={[css.letra3, {fontSize: 32, textAlign: 'center', width: 280}]}>O que você deseja transportar?</Text>
        <View style={{alignItems: 'center', width: 310, marginTop: 20}}>
          <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>Insira aqui todos os itens e as respectivas quantidades que deseja transportar no frete.</Text>
        </View>
      </View>

      <View style={[css.alinhamentoRow, {justifyContent: 'space-around', marginTop: 20}]}>
        <View style={{flexDirection: 'column'}}>
          <TextInput
            placeholder='   Insira o nome do item'
            value={inputValue}
            placeholderTextColor='black'
            onChangeText={text=>{setInputValue(text)}}
            style={{
              borderRadius: 8,
              backgroundColor: 'lightgray',
              opacity: 0.35,
              width: 300,
              height: 50,
              padding: 5,
              marginTop: 5}}/>
        </View>

        <View style={{marginTop: 5}}>
          <TouchableOpacity onPress={()=>handleAddButtonClick()}>
            <Icon  name='add' size={40}/>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {items.map((item, index) => (

          <View key={index} style={[css.alinhamentoRow, {justifyContent: 'space-around', marginTop: 20}]}>
            <View
              style={{
                flexDirection: 'column',
                borderRadius: 8,
                backgroundColor: '#FFA666',
                opacity: 0.35,
                width: 200,
                height: 45,
                padding: 5,
                marginRight: -15,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5}}>
              <Text style={{fontSize: 15}}>{item.itemName}</Text>
            </View>

            <TouchableOpacity onPress={()=>handleQuantityIncrease(index)}>
              <Icon  name='add' size={30} style={{color: 'black'}}/>
            </TouchableOpacity>

            <View
                style={[css.addThings,{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFA666',
                  marginTop: 5,
                  marginLeft: -15,
                  marginRight: -15,
                  width: 50,
                  borderRadius: 8,
                  height: 45}]}
            >
              <Text style={{fontSize: 15}}>{item.quantity}</Text>
            </View>

            <TouchableOpacity onPress={()=>handleQuantityDecrease(index)}>
              <Icon name='minimize' size={30} style={{color: 'black', bottom: 10}}/>
            </TouchableOpacity>
          </View>

        ))}
      </ScrollView>

      <View>
        <View style={{alignItems: 'center', alignSelf: 'center', width: 200, marginBottom: -40, fontWeight: '500'}}>
          <Text style={{top: 5, fontSize: 15, fontWeight: '400'}}>Os itens serão conferidos antes de dar início ao frete.</Text>
        </View>

        <View style={{alignItems: 'center', marginBottom: 40}}>
          {items.length > 0 &&
            <TouchableOpacity onPress={()=>navigation.navigate('SearchOrigin', {items: items})}
              style={[css.button, {borderRadius: 8, backgroundColor: '#ff8c00', width: 300}]}>
              <Text style={css.letra}>Continuar</Text>
            </TouchableOpacity>
          }

          {items.length == 0 &&
            <TouchableOpacity
              style={[css.button, {borderRadius: 8, backgroundColor: 'lightgray', width: 300}]}>
              <Text style={css.letra}>Continuar</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

    </View>
  );
}
