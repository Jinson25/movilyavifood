import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ShoppingBagIcon } from 'react-native-heroicons/solid'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

export default function FoodCard({ item, index }) {
  const navigation = useNavigation();
  return (
    <Animatable.View
      delay={index * 120}
      animation="slideInRight"
      className="w-56 h-70 my-5 mr-6 p-3 py-5 rounded-3xl"
      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
    >
      <View className="flex-row justify-center"
      >
        <Image source={{ uri: item.imageUrl }} className="h-32 w-32" />
      </View>
      <View className="flex-1 px-3 py-2 space-y-2">
        <Text className="text-white text-xl font-medium tracking-wider">{item.name}</Text>
        <Image source={require('../assets/icons/clock.png')} className="h-6 w-6"/><Text className="text-white">{item.cookTime}</Text>
        <Text className="text-white">{item.origins}</Text>
      </View>
      {/* Estrellas de calificación */}
      <View className="flex-row items-center justify-between px-3">
        <StarRating
          disabled
          maxStars={5}
          rating={item.stars}
          starSize={20}
          fullStarColor={'#FFD700'}
          emptyStarColor={'#D3D3D3'}
        />
      </View>


      <View className="flex-row justify-between items-center px-1">
        <Text className="text-2xl font-semibold text-white">${item.price}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetails', { ...item })}
          className="bg-white p-3 rounded-full">
          <ShoppingBagIcon size="25" color="black" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}