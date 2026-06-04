import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {
  GROWTH_THN_DISC_ITEM_HEIGHT,
  GROWTH_THN_DISC_PEG_BASE_H,
  growthThnCalcFixedPegAreaHeight,
  growthThnCalcFixedRodHeight,
  growthThnDiscGetDiscColor,
  growthThnDiscGetDiscWidth,
  growthThnDiscStackStep,
  type GrowthThnDiscPegs,
} from '../growthThnUtil/GrowthThnDiscGameUtils';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_PEG_BASE_W = 52;
const GROWTH_THN_PEG_ROD_W = 5;
const GROWTH_THN_BOARD_PAD = 24;
const GROWTH_THN_FIXED_PEG_HEIGHT = growthThnCalcFixedPegAreaHeight();
const GROWTH_THN_FIXED_ROD_HEIGHT = growthThnCalcFixedRodHeight();

type GrowthThnDiscBoardProps = {
  pegs: GrowthThnDiscPegs;
  discCount: number;
  selectedPeg: number | null;
  onPegPress: (pegIndex: number) => void;
};

export function GrowthThnDiscBoard({
  pegs,
  discCount,
  selectedPeg,
  onPegPress,
}: GrowthThnDiscBoardProps) {
  const growthThnDiscStep = growthThnDiscStackStep();

  return (
    <View style={styles.growthThnBoard}>
      <View style={styles.growthThnPegsRow}>
        {([0, 1, 2] as const).map(pegIndex => {
          const growthThnStack = pegs[pegIndex];
          const growthThnTopIndex = growthThnStack.length - 1;

          return (
            <View
              key={`growth-thn-peg-${pegIndex}`}
              style={[
                styles.growthThnPegCell,
                selectedPeg === pegIndex && styles.growthThnPegCellSelected,
              ]}>
              <Pressable
                style={styles.growthThnPegTap}
                onPress={() => onPegPress(pegIndex)}
                disabled={selectedPeg === null && growthThnStack.length === 0}>
                <View
                  style={[
                    styles.growthThnPegArea,
                    {height: GROWTH_THN_FIXED_PEG_HEIGHT},
                  ]}>
                  <View
                    style={[
                      styles.growthThnPegRod,
                      {
                        height: GROWTH_THN_FIXED_ROD_HEIGHT,
                        bottom: GROWTH_THN_DISC_PEG_BASE_H - 2,
                      },
                    ]}
                  />
                  <View style={styles.growthThnPegBase} />
                  {growthThnStack.map((discSize, stackIndex) => {
                    const growthThnIsTop = stackIndex === growthThnTopIndex;
                    const growthThnIsLifted =
                      growthThnIsTop && selectedPeg === pegIndex;
                    const growthThnWidth = growthThnDiscGetDiscWidth(
                      discSize,
                      discCount,
                      100,
                    );
                    const growthThnBottom =
                      GROWTH_THN_DISC_PEG_BASE_H +
                      4 +
                      stackIndex * growthThnDiscStep;

                    const growthThnDiscStyle = [
                      styles.growthThnDisc,
                      {
                        width: growthThnWidth,
                        bottom: growthThnBottom,
                        backgroundColor: growthThnDiscGetDiscColor(
                          discSize,
                          discCount,
                        ),
                      },
                      growthThnIsLifted && styles.growthThnDiscLifted,
                    ];

                    if (growthThnIsTop) {
                      return (
                        <Pressable
                          key={`growth-thn-disc-${pegIndex}-${stackIndex}`}
                          onPress={() => onPegPress(pegIndex)}
                          style={[
                            growthThnDiscStyle,
                            styles.growthThnDiscPress,
                          ]}
                        />
                      );
                    }

                    return (
                      <View
                        key={`growth-thn-disc-${pegIndex}-${stackIndex}`}
                        pointerEvents="none"
                        style={growthThnDiscStyle}
                      />
                    );
                  })}
                </View>
              </Pressable>
              <Text style={styles.growthThnPegLabel}>{pegIndex + 1}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnBoard: {
    backgroundColor: '#1a0c0c',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a1414',
    paddingVertical: GROWTH_THN_BOARD_PAD,
    paddingHorizontal: 16,
  },
  growthThnPegsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  growthThnPegCell: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  growthThnPegCellSelected: {
    opacity: 1,
  },
  growthThnPegTap: {
    width: '100%',
    alignItems: 'center',
  },
  growthThnPegArea: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  growthThnPegBase: {
    position: 'absolute',
    bottom: 0,
    width: GROWTH_THN_PEG_BASE_W,
    height: GROWTH_THN_DISC_PEG_BASE_H,
    borderRadius: GROWTH_THN_DISC_PEG_BASE_H / 2,
    backgroundColor: '#4a2828',
  },
  growthThnPegRod: {
    position: 'absolute',
    width: GROWTH_THN_PEG_ROD_W,
    borderRadius: GROWTH_THN_PEG_ROD_W / 2,
    backgroundColor: '#5c3030',
  },
  growthThnDisc: {
    position: 'absolute',
    height: GROWTH_THN_DISC_ITEM_HEIGHT,
    borderRadius: GROWTH_THN_DISC_ITEM_HEIGHT / 2,
    zIndex: 1,
  },
  growthThnDiscPress: {
    zIndex: 2,
  },
  growthThnDiscLifted: {
    transform: [{translateY: -8}],
    zIndex: 3,
    shadowColor: growthThnColors.accentYellow,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 0},
    elevation: 4,
  },
  growthThnPegLabel: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#6a5048',
    textAlign: 'center',
  },
});
