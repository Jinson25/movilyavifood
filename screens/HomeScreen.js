import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
import { categories } from '../constants'
import * as Animatable from 'react-native-animatable';
import FoodCard from '../components/FoodCard';
import axios from 'axios';
import { BASE_URL } from '../constants/config'

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los alimentos desde el backend
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/foods`);  // Reemplaza con la URL de tu backend
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error al obtener alimentos:', error);
      } finally {
        setLoading(false);
      }
    };
    // Llama a la función para obtener alimentos cuando el componente se monta
    fetchFoodItems();
  }, []);  // El segundo argumento [] significa que se ejecutará solo al montar el componente

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View className="flex-1 relative">
      <SafeAreaView className="flex-1 bg-black">
        {/* top buttons */}
        <View className="flex-row justify-between items-center mx-4">
          <View className="bg-white shadow-md rounded-2xl p-3">
            <Bars3CenterLeftIcon size="25" stroke={100} color="black" />
          </View>
          <View className="rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: 3 }}>
            <Image className="h-12 w-12 rounded-2xl" source={require('../assets/images/avatar.png')} style={{ backgroundColor: 'rgba(255,255,255,0.7)' }} />
          </View>
        </View>
        {/* punch line */}
        <View className="my-12 space-y-2">
          <Text className="mx-4 text-6xl font-extrabold color-white">
            Yavi<Text className="font-extrabold" style={{ color: '#FFA07A' }}>Food</Text>
          </Text>
          <Text className="mx-4 text-1xl">Con un menú excepcional que te transportará a un mundo de sabores exquisitos.</Text>
        </View>
        {/* search  */}
        <View className="mx-4 flex-row justify-between items-center space-x-3">
          <View className="flex-row flex-1 p-4 bg-white rounded-2xl">
            <MagnifyingGlassIcon stroke={40} color="gray" />
            <TextInput placeholder='Food' value="Search" className="ml-2 text-gray-800" />
          </View>
        </View>

        {/* categories scrollbar */}
        <ScrollView
          className="mt-6 pt-6 max-h-20"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {
            categories.map((category, index) => {
              let isActive = category == activeCategory;
              let textClass = isActive ? ' font-bold' : '';
              return (
                <Animatable.View
                  delay={index * 120} // delay for each item
                  animation="slideInDown" // animation type
                  key={index}>
                  <TouchableOpacity
                    className="mr-9"
                    onPress={() => setActiveCategory(category)}
                  >
                    <Text className={"text-white text-base tracking-widest " + textClass}>
                      {category}
                    </Text>
                    {
                      isActive ? (
                        <View className="flex-row justify-center">
                          <Image source={require('../assets/images/line.png')}
                            className="h-4 w-5" />
                        </View>
                      ) : null
                    }
                  </TouchableOpacity>
                </Animatable.View>
              )
            })
          }
        </ScrollView>
        {/* food cards */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10 }}
          horizontal showsHorizontalScrollIndicator={true}
        >
          {
            foodItems.map((item, index) => <FoodCard item={item} index={index} key={index} />)
          }
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}