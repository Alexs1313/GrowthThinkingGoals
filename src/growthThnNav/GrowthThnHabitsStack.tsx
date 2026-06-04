import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {GrowthThnAllHabitsScreen} from '../growthThnScrn/GrowthThnAllHabitsScreen';
import {GrowthThnCreateHabitScreen} from '../growthThnScrn/GrowthThnCreateHabitScreen';
import {GrowthThnHabitsHomeScreen} from '../growthThnScrn/GrowthThnHabitsHomeScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import type {GrowthThnHabitsStackParamList} from './GrowthThnHabitsStackTypes';

const growthThnHabitsStack = createStackNavigator<GrowthThnHabitsStackParamList>();

export function GrowthThnHabitsStack() {
  return (
    <growthThnHabitsStack.Navigator
      initialRouteName="HabitsHome"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: growthThnColors.background},
        gestureEnabled: true,
      }}>
      <growthThnHabitsStack.Screen name="HabitsHome" component={GrowthThnHabitsHomeScreen} />
      <growthThnHabitsStack.Screen name="CreateHabit" component={GrowthThnCreateHabitScreen} />
      <growthThnHabitsStack.Screen name="AllHabits" component={GrowthThnAllHabitsScreen} />
    </growthThnHabitsStack.Navigator>
  );
}
