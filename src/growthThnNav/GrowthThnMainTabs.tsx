import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

import {growthThnImages} from '../growthThnAssts';
import {GrowthThnArticlesStack} from './GrowthThnArticlesStack';
import {GrowthThnDiscStack} from './GrowthThnDiscStack';
import {GrowthThnHabitsStack} from './GrowthThnHabitsStack';
import {GrowthThnTasksStack} from './GrowthThnTasksStack';
import {GrowthThnStatsScreen} from '../growthThnScrn/GrowthThnStatsScreen';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';
import type {GrowthThnMainTabParamList} from './GrowthThnTypes';

const growthThnTab = createBottomTabNavigator<GrowthThnMainTabParamList>();

type GrowthThnTabConfig = {
  label: string;
  icon: ImageSourcePropType;
};

const growthThnTabConfig: Record<keyof GrowthThnMainTabParamList, GrowthThnTabConfig> = {
  Habits: {label: 'Habits', icon: growthThnImages.tabHabits},
  Tasks: {label: 'Tasks', icon: growthThnImages.tabTasks},
  Articles: {label: 'Articles', icon: growthThnImages.tabArticles},
  Discs: {label: 'Discs', icon: growthThnImages.tabDiscs},
  Stats: {label: 'Stats', icon: growthThnImages.tabStats},
};

function growthThnMakeTabIcon(tabName: keyof GrowthThnMainTabParamList) {
  const {label, icon} = growthThnTabConfig[tabName];

  return ({focused}: {focused: boolean}) => (
    <View style={styles.growthThnTabItem}>
      <View
        style={[
          styles.growthThnIconWrap,
          focused && styles.growthThnIconWrapFocused,
        ]}>
        <Image
          source={icon}
          style={[
            styles.growthThnIcon,
            {tintColor: focused ? growthThnColors.accentYellow : growthThnColors.tabIdle},
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          styles.growthThnTabLabel,
          {color: focused ? growthThnColors.accentYellow : growthThnColors.tabIdle},
        ]}>
        {label}
      </Text>
    </View>
  );
}

function GrowthThnAnimatedTabButton(props: Record<string, unknown>) {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.88,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();
      }}
      style={[style as ViewStyle, styles.growthThnTabButton]}
      {...rest}>
      <Animated.View style={[styles.growthThnTabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
}

function GrowthThnTabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#030807F2', '#030807F2']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.growthThnTabBarTopBorder} />
    </View>
  );
}

export function GrowthThnMainTabs() {
  return (
    <growthThnTab.Navigator
      initialRouteName="Habits"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.growthThnTabBar,
        tabBarBackground: GrowthThnTabBarBackground,
        tabBarButton: props => <GrowthThnAnimatedTabButton {...props} />,
      }}>
      <growthThnTab.Screen
        name="Habits"
        component={GrowthThnHabitsStack}
        options={{tabBarIcon: growthThnMakeTabIcon('Habits')}}
      />
      <growthThnTab.Screen
        name="Tasks"
        component={GrowthThnTasksStack}
        options={{tabBarIcon: growthThnMakeTabIcon('Tasks')}}
      />
      <growthThnTab.Screen
        name="Articles"
        component={GrowthThnArticlesStack}
        options={{tabBarIcon: growthThnMakeTabIcon('Articles')}}
      />
      <growthThnTab.Screen
        name="Discs"
        component={GrowthThnDiscStack}
        options={{tabBarIcon: growthThnMakeTabIcon('Discs')}}
      />
      <growthThnTab.Screen
        name="Stats"
        component={GrowthThnStatsScreen}
        options={{tabBarIcon: growthThnMakeTabIcon('Stats')}}
      />
    </growthThnTab.Navigator>
  );
}

const styles = StyleSheet.create({
  growthThnTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 64,
  },
  growthThnIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnIconWrapFocused: {
    backgroundColor: growthThnColors.panel,
    borderWidth: 1,
    borderColor: growthThnColors.border,
  },
  growthThnIcon: {
    width: 22,
    height: 22,
  },
  growthThnTabLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  growthThnTabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    height: 78,
    paddingTop: 18,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  growthThnTabBarTopBorder: {
    height: 1,
    backgroundColor: growthThnColors.border,
  },
  growthThnTabButton: {flex: 1},
  growthThnTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
