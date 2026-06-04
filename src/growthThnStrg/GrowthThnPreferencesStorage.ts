import AsyncStorage from '@react-native-async-storage/async-storage';

const growthThnOnboardingCompleteKey = 'growthThn:onboarding-complete';

export const growthThnLoadOnboardingComplete = async (): Promise<boolean> => {
  const raw = await AsyncStorage.getItem(growthThnOnboardingCompleteKey);
  return raw === '1';
};

export const growthThnSaveOnboardingComplete = async (): Promise<void> => {
  await AsyncStorage.setItem(growthThnOnboardingCompleteKey, '1');
};
