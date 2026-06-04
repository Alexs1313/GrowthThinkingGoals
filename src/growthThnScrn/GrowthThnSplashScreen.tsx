import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {growthThnImages} from '../growthThnAssts';
import {GrowthThnSunLoader} from '../growthThnCpnnts/GrowthThnSunLoader';
import type {GrowthThnRootStackParamList} from '../growthThnNav/GrowthThnTypes';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_SPLASH_MS = 3200;

export function GrowthThnSplashScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnRootStackParamList>>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const growthThnTimeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, GROWTH_THN_SPLASH_MS);

    return () => clearTimeout(growthThnTimeout);
  }, [navigation]);

  return (
    <View style={styles.growthThnRoot}>
      <Image
        source={growthThnImages.loaderBackground}
        style={styles.growthThnBackground}
        resizeMode="cover"
      />
      <View style={styles.growthThnOverlay} />
      <View style={styles.growthThnContent}>
        <GrowthThnSunLoader />
      </View>
      <Text
        style={[
          styles.growthThnCaption,
          {paddingBottom: Math.max(insets.bottom, 24)},
        ]}>
        Preparing your growth path...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: growthThnColors.background,
  },
  growthThnBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  growthThnOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: growthThnColors.panelStrong,
  },
  growthThnContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnCaption: {
    textAlign: 'center',
    color: growthThnColors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.15,
  },
});
