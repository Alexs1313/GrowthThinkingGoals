import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {GrowthThnDiscGameScreen} from '../growthThnScrn/GrowthThnDiscGameScreen';
import {GrowthThnDiscLevelsScreen} from '../growthThnScrn/GrowthThnDiscLevelsScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import type {GrowthThnDiscStackParamList} from './GrowthThnDiscStackTypes';

const growthThnDiscStack = createStackNavigator<GrowthThnDiscStackParamList>();

export function GrowthThnDiscStack() {
  return (
    <growthThnDiscStack.Navigator
      initialRouteName="DiscLevels"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: growthThnColors.background},
        gestureEnabled: true,
      }}>
      <growthThnDiscStack.Screen
        name="DiscLevels"
        component={GrowthThnDiscLevelsScreen}
      />
      <growthThnDiscStack.Screen name="DiscGame" component={GrowthThnDiscGameScreen} />
    </growthThnDiscStack.Navigator>
  );
}
