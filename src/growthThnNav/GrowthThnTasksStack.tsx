import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {GrowthThnCompletedTasksScreen} from '../growthThnScrn/GrowthThnCompletedTasksScreen';
import {GrowthThnTasksHomeScreen} from '../growthThnScrn/GrowthThnTasksHomeScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import type {GrowthThnTasksStackParamList} from './GrowthThnTasksStackTypes';

const growthThnTasksStack = createStackNavigator<GrowthThnTasksStackParamList>();

export function GrowthThnTasksStack() {
  return (
    <growthThnTasksStack.Navigator
      initialRouteName="TasksHome"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: growthThnColors.background},
        gestureEnabled: true,
      }}>
      <growthThnTasksStack.Screen name="TasksHome" component={GrowthThnTasksHomeScreen} />
      <growthThnTasksStack.Screen
        name="CompletedTasks"
        component={GrowthThnCompletedTasksScreen}
      />
    </growthThnTasksStack.Navigator>
  );
}
