import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GrowthThnDiscBoard} from '../growthThnCpnnts/GrowthThnDiscBoard';
import {GrowthThnDiscCompleteModal} from '../growthThnCpnnts/GrowthThnDiscCompleteModal';
import {useGrowthThnDisc} from '../growthThnCtx/GrowthThnDiscContext';
import {growthThnGetDiscLevel} from '../growthThnData/GrowthThnDiscLevelData';
import type {GrowthThnDiscStackParamList} from '../growthThnNav/GrowthThnDiscStackTypes';
import {
  growthThnDiscGetDifficultyStyle,
  growthThnDiscInitPegs,
  growthThnDiscIsComplete,
  growthThnDiscMove,
  type GrowthThnDiscPegs,
} from '../growthThnUtil/GrowthThnDiscGameUtils';
import {growthThnFormatTimer} from '../growthThnUtil/GrowthThnTimeUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';
import Orientation from 'react-native-orientation-locker';

export function GrowthThnDiscGameScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnDiscStackParamList>>();
  const route = useRoute<RouteProp<GrowthThnDiscStackParamList, 'DiscGame'>>();
  const insets = useSafeAreaInsets();
  const {growthThnSaveLevelResult} = useGrowthThnDisc();

  const growthThnLevel = growthThnGetDiscLevel(route.params.levelId);
  const growthThnDifficulty = growthThnDiscGetDifficultyStyle(
    growthThnLevel.difficulty,
  );

  const [pegs, setPegs] = useState<GrowthThnDiscPegs>(() =>
    growthThnDiscInitPegs(growthThnLevel.discCount),
  );
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const growthThnSecondsRef = useRef(0);
  const growthThnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const growthThnResetGame = useCallback(() => {
    setPegs(growthThnDiscInitPegs(growthThnLevel.discCount));
    setSelectedPeg(null);
    setMoves(0);
    setSeconds(0);
    growthThnSecondsRef.current = 0;
    setIsRunning(false);
    setShowComplete(false);
    setIsNewRecord(false);
  }, [growthThnLevel.discCount]);

  useEffect(() => {
    growthThnResetGame();
  }, [growthThnResetGame, route.params.levelId]);

  useEffect(() => {
    growthThnSecondsRef.current = seconds;
  }, [seconds]);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useEffect(() => {
    if (!isRunning) {
      if (growthThnIntervalRef.current) {
        clearInterval(growthThnIntervalRef.current);
        growthThnIntervalRef.current = null;
      }
      return;
    }
    growthThnIntervalRef.current = setInterval(() => {
      setSeconds(prev => {
        const growthThnNext = prev + 1;
        growthThnSecondsRef.current = growthThnNext;
        return growthThnNext;
      });
    }, 1000);
    return () => {
      if (growthThnIntervalRef.current) {
        clearInterval(growthThnIntervalRef.current);
      }
    };
  }, [isRunning]);

  const growthThnOnPegPress = (pegIndex: number) => {
    if (showComplete) {
      return;
    }

    if (selectedPeg === null) {
      if (pegs[pegIndex].length > 0) {
        setSelectedPeg(pegIndex);
      }
      return;
    }

    if (selectedPeg === pegIndex) {
      setSelectedPeg(null);
      return;
    }

    const growthThnNext = growthThnDiscMove(pegs, selectedPeg, pegIndex);
    if (!growthThnNext) {
      return;
    }

    if (!isRunning && moves === 0) {
      setIsRunning(true);
    }

    const growthThnNewMoves = moves + 1;
    setPegs(growthThnNext);
    setSelectedPeg(null);
    setMoves(growthThnNewMoves);

    if (growthThnDiscIsComplete(growthThnNext, growthThnLevel.discCount)) {
      setIsRunning(false);
      const growthThnNew = growthThnSaveLevelResult(
        growthThnLevel.id,
        growthThnNewMoves,
        growthThnSecondsRef.current,
      );
      setIsNewRecord(growthThnNew);
      setShowComplete(true);
    }
  };

  const growthThnHasNextLevel = growthThnLevel.id < 6;

  return (
    <View style={styles.growthThnRoot}>
      <ScrollView
        contentContainerStyle={[
          styles.growthThnScroll,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + growthThnMetrics.tabHeight + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.growthThnTopRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.growthThnBack}>
            <Text style={styles.growthThnBackText}>‹ Levels</Text>
          </Pressable>
          <View style={styles.growthThnControls}>
            <Pressable
              style={styles.growthThnControlBtn}
              onPress={() => setIsRunning(prev => !prev)}
              disabled={moves === 0 && !isRunning}>
              <Image
                source={
                  isRunning
                    ? require('../growthThnAssts/pause.png')
                    : require('../growthThnAssts/start.png')
                }
              />
            </Pressable>
            <Pressable
              style={styles.growthThnControlBtn}
              onPress={growthThnResetGame}>
              <Text style={styles.growthThnControlIcon}>↻</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.growthThnHeaderRow}>
          <View style={styles.growthThnHeaderLeft}>
            <Text style={styles.growthThnLevelTitle}>
              Level {growthThnLevel.id}
            </Text>
            <View
              style={[
                styles.growthThnTag,
                {backgroundColor: growthThnDifficulty.backgroundColor},
              ]}>
              <Text
                style={[
                  styles.growthThnTagText,
                  {color: growthThnDifficulty.color},
                ]}>
                {growthThnLevel.difficulty}
              </Text>
            </View>
          </View>
          <View style={styles.growthThnHeaderStats}>
            <View style={styles.growthThnStatBlock}>
              <Text style={styles.growthThnStatValue}>{moves}</Text>
              <Text style={styles.growthThnStatLabel}>Moves</Text>
            </View>
            <View style={styles.growthThnStatBlock}>
              <Text style={styles.growthThnStatValue}>
                {growthThnFormatTimer(seconds)}
              </Text>
              <Text style={styles.growthThnStatLabel}>Time</Text>
            </View>
          </View>
        </View>

        <Text style={styles.growthThnHint}>
          Tap a peg to select, then tap destination
        </Text>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <GrowthThnDiscBoard
            pegs={pegs}
            discCount={growthThnLevel.discCount}
            selectedPeg={selectedPeg}
            onPegPress={growthThnOnPegPress}
          />
        </View>

        <Text style={styles.growthThnMinMoves}>
          Min moves: {growthThnLevel.minMoves} · {growthThnLevel.discCount}{' '}
          discs
        </Text>
      </ScrollView>

      <GrowthThnDiscCompleteModal
        visible={showComplete}
        isNewRecord={isNewRecord}
        moves={moves}
        seconds={seconds}
        hasNextLevel={growthThnHasNextLevel}
        onNextLevel={() => {
          setShowComplete(false);
          navigation.replace('DiscGame', {levelId: growthThnLevel.id + 1});
        }}
        onPlayAgain={() => {
          setShowComplete(false);
          growthThnResetGame();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: '#000000',
  },
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 16,
    flex: 1,
  },
  growthThnTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  growthThnBack: {
    paddingVertical: 4,
  },
  growthThnBackText: {
    fontSize: 16,
    fontWeight: '600',
    color: growthThnColors.accentGold,
  },
  growthThnControls: {
    flexDirection: 'row',
    gap: 10,
  },
  growthThnControlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    backgroundColor: growthThnColors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnControlIcon: {
    fontSize: 16,
    color: growthThnColors.accentGold,
  },
  growthThnHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  growthThnHeaderLeft: {
    gap: 8,
  },
  growthThnLevelTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnTag: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  growthThnTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  growthThnHeaderStats: {
    flexDirection: 'row',
    gap: 20,
  },
  growthThnStatBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  growthThnStatValue: {
    fontSize: 22,
    fontWeight: '800',
    color: growthThnColors.text,
    fontVariant: ['tabular-nums'],
  },
  growthThnStatLabel: {
    fontSize: 12,
    color: growthThnColors.textMuted,
  },
  growthThnHint: {
    fontSize: 14,
    color: growthThnColors.textMuted,
    textAlign: 'center',
  },
  growthThnMinMoves: {
    fontSize: 13,
    color: growthThnColors.textMutedDark,
    textAlign: 'center',
    marginTop: 4,
  },
});
