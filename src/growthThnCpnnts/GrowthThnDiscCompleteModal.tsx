import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import {growthThnFormatTimer} from '../growthThnUtil/GrowthThnTimeUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

type GrowthThnDiscCompleteModalProps = {
  visible: boolean;
  isNewRecord: boolean;
  moves: number;
  seconds: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onPlayAgain: () => void;
};

export function GrowthThnDiscCompleteModal({
  visible,
  isNewRecord,
  moves,
  seconds,
  hasNextLevel,
  onNextLevel,
  onPlayAgain,
}: GrowthThnDiscCompleteModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.growthThnBackdrop}>
        <View style={styles.growthThnCard}>
          <View style={styles.growthThnTrophy}>
            <Text style={styles.growthThnTrophyIcon}>🏆</Text>
          </View>
          <Text style={styles.growthThnTitle}>
            {isNewRecord ? 'New Growth Record!' : 'Level Complete!'}
          </Text>
          <Text style={styles.growthThnSub}>
            Completed in {moves} moves and {growthThnFormatTimer(seconds)}.
          </Text>
          <View style={styles.growthThnActions}>
            {hasNextLevel ? (
              <Pressable style={styles.growthThnPrimaryBtn} onPress={onNextLevel}>
                <Text style={styles.growthThnPrimaryText}>Next Level</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={[
                styles.growthThnSecondaryBtn,
                !hasNextLevel && styles.growthThnSecondaryBtnFull,
              ]}
              onPress={onPlayAgain}>
              <Text style={styles.growthThnSecondaryText}>Play Again</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  growthThnBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: growthThnMetrics.screenPadding,
  },
  growthThnCard: {
    width: '100%',
    backgroundColor: growthThnColors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: growthThnColors.accentGold,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  growthThnTrophy: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: growthThnColors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnTrophyIcon: {
    fontSize: 28,
  },
  growthThnTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: growthThnColors.text,
    textAlign: 'center',
  },
  growthThnSub: {
    fontSize: 15,
    color: growthThnColors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  growthThnActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  growthThnPrimaryBtn: {
    flex: 1,
    backgroundColor: growthThnColors.accent,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  growthThnPrimaryText: {
    fontSize: 15,
    fontWeight: '800',
    color: growthThnColors.accentYellow,
  },
  growthThnSecondaryBtn: {
    flex: 1,
    backgroundColor: growthThnColors.panelInner,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: growthThnColors.border,
  },
  growthThnSecondaryBtnFull: {
    flex: 1,
  },
  growthThnSecondaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
});
