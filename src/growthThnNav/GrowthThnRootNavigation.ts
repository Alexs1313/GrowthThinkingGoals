import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type {GrowthThnRootStackParamList} from './GrowthThnTypes';

export const growthThnNavigationRef =
  createNavigationContainerRef<GrowthThnRootStackParamList>();

export function growthThnNavigateRootScreen<
  RouteName extends keyof GrowthThnRootStackParamList,
>(screen: RouteName, params?: GrowthThnRootStackParamList[RouteName]) {
  if (!growthThnNavigationRef.isReady()) {
    return;
  }

  growthThnNavigationRef.navigate(screen as never, params as never);
}

export function growthThnReplaceRootScreen<
  RouteName extends keyof GrowthThnRootStackParamList,
>(screen: RouteName, params?: GrowthThnRootStackParamList[RouteName]) {
  if (!growthThnNavigationRef.isReady()) {
    return;
  }

  growthThnNavigationRef.dispatch(StackActions.replace(screen, params));
}

export function growthThnResetToMain() {
  if (!growthThnNavigationRef.isReady()) {
    return;
  }

  growthThnNavigationRef.reset({
    index: 0,
    routes: [{name: 'Main'}],
  });
}
