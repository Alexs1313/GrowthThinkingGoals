import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {GrowthThnArticleDetailScreen} from '../growthThnScrn/GrowthThnArticleDetailScreen';
import {GrowthThnArticlesListScreen} from '../growthThnScrn/GrowthThnArticlesListScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import type {GrowthThnArticlesStackParamList} from './GrowthThnArticlesStackTypes';

const growthThnArticlesStack =
  createStackNavigator<GrowthThnArticlesStackParamList>();

export function GrowthThnArticlesStack() {
  return (
    <growthThnArticlesStack.Navigator
      initialRouteName="ArticlesList"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: growthThnColors.background},
        gestureEnabled: true,
      }}>
      <growthThnArticlesStack.Screen
        name="ArticlesList"
        component={GrowthThnArticlesListScreen}
      />
      <growthThnArticlesStack.Screen
        name="ArticleDetail"
        component={GrowthThnArticleDetailScreen}
      />
    </growthThnArticlesStack.Navigator>
  );
}
