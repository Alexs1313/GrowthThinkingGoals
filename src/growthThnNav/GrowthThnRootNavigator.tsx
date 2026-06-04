import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {GrowthThnDiscProvider} from '../growthThnCtx/GrowthThnDiscContext';
import {GrowthThnGoalsProvider} from '../growthThnCtx/GrowthThnGoalsContext';
import {GrowthThnHabitsProvider} from '../growthThnCtx/GrowthThnHabitsContext';
import {GrowthThnTasksProvider} from '../growthThnCtx/GrowthThnTasksContext';
import {GrowthThnMercuryPathScreen} from '../growthThnScrn/GrowthThnMercuryPathScreen';
import {GrowthThnOnboardingScreen} from '../growthThnScrn/GrowthThnOnboardingScreen';
import {GrowthThnSplashScreen} from '../growthThnScrn/GrowthThnSplashScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import {GrowthThnMainTabs} from './GrowthThnMainTabs';
import {growthThnNavigationRef} from './GrowthThnRootNavigation';
import type {GrowthThnRootStackParamList} from './GrowthThnTypes';

const growthThnStack = createStackNavigator<GrowthThnRootStackParamList>();

const growthThnNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: growthThnColors.background,
    card: growthThnColors.background,
    text: growthThnColors.text,
    border: 'transparent',
    notification: growthThnColors.accent,
  },
};

export function GrowthThnRootNavigator() {
  return (
    <GrowthThnGoalsProvider>
      <GrowthThnHabitsProvider>
        <GrowthThnTasksProvider>
        <GrowthThnDiscProvider>
        <NavigationContainer ref={growthThnNavigationRef} theme={growthThnNavTheme}>
          <growthThnStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
              gestureEnabled: false,
            }}>
            <growthThnStack.Screen name="Splash" component={GrowthThnSplashScreen} />
            <growthThnStack.Screen name="Onboarding" component={GrowthThnOnboardingScreen} />
            <growthThnStack.Screen name="MercuryPath" component={GrowthThnMercuryPathScreen} />
            <growthThnStack.Screen name="Main" component={GrowthThnMainTabs} />
          </growthThnStack.Navigator>
        </NavigationContainer>
        </GrowthThnDiscProvider>
        </GrowthThnTasksProvider>
      </GrowthThnHabitsProvider>
    </GrowthThnGoalsProvider>
  );
}
