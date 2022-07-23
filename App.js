
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Clients from './screens/Clients';
import Profile from './screens/Profile';
import AddClients from './screens/AddClieant';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0d2582'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          },
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Login" component={Login}
        />
        <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Clients" component={Clients} />
        <Stack.Screen name="AddClients" component={AddClients} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;