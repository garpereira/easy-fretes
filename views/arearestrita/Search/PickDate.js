import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Image,  Button,
         TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { css } from '../../../assets/css/Css';
import MenuAreaRestrita from '../../../assets/components/MenuAreaRestrita';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapViewDirections from 'react-native-maps-directions';
import config from '../../../config';

/* Tela para escolher a data */

/*
  Preço:
    300 + (5 * distance) + (100 * numAjudantes)
        + (8 * grande) + (5 * medio) + (3 * pequenos)
        + (100 se tiver escada) + (50 * (duration/30))
*/

export default function PickDate (props) {

  const [distance,setDistance] = useState(null);
  const [duration,setDuration] = useState(null);
  const [price,setPrice] = useState(null);

  const [adressOrigin,setAdressOrigin] = useState(null);
  const [adressDestination,setAdressDestination] = useState(null);

  const [date,setDate] = useState(new Date());
  const [show,setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(()=> {
    if (distance !== null && price !== null) {
      props.navigation.navigate('SearchResult', {
        items: props.route.params.items,
        origem: props.route.params.origem, destino:props.route.params.destino,
        preco: price.toFixed(2), duracao: duration.toFixed(2),
        distancia: distance.toFixed(2)
      });
    }
  },[distance]);

  // function getPrice(distance, numAjudantes, sizeObjects, ) {
  //   return
  // } 

  return (
    <View style={css.container}>
      <MenuAreaRestrita navigation={props.navigation}/>

      { date &&
        <MapViewDirections
          origin = {props.route.params.origem}
          destination = {props.route.params.destino}
          apikey = {config.googleApi}
          onReady = {result=>{
            setDistance(result.distance);
            setPrice(result.distance * 6);
            setDuration(result.duration);
          }}
        />
      }

      <View style={{alignItems: 'center'}}>
        <Image source={require('../../../assets/img/moving.png')} />
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={{width: '80%'}}>
          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              backgroundColor: 'lightgrey',
              color: '#fff',
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              shadowColor: 'black',
              elevation: 3,
            }}
          >
            <Text style={css.letra}>Quando?</Text>
          </TouchableOpacity>
        </View>

        {show && (
            <DateTimePicker
              testID='DateTimePicker'
              value={date}
              mode={'date'}
              is24Hours={true}
              display='default'
              onChange={onChange}
            />
        )}
      </View>
    </View>
  );
}
