import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GrowthThnRootNavigator} from './src/growthThnNav/GrowthThnRootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <GrowthThnRootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
