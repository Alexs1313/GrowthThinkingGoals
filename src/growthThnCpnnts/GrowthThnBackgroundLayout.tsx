import type {ReactNode} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

type GrowthThnBackgroundLayoutProps = {
  children: ReactNode;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function GrowthThnBackgroundLayout({
  children,
  scroll = true,
  contentContainerStyle,
}: GrowthThnBackgroundLayoutProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.growthThnContent,
        {
          paddingTop: 54,
          paddingBottom: Math.max(insets.bottom, 16),
        },
        !scroll && styles.growthThnFlex,
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={styles.growthThnRoot}>
      <LinearGradient
        colors={[
          growthThnColors.backgroundGradientStart,
          growthThnColors.backgroundGradientEnd,
          growthThnColors.background,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        style={styles.growthThnFlex}
        contentContainerStyle={styles.growthThnScrollContent}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: growthThnColors.background,
  },
  growthThnScrollContent: {
    flexGrow: 1,
  },
  growthThnContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  growthThnFlex: {
    flex: 1,
  },
});
