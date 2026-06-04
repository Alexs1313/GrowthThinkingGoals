import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

type GrowthThnDeleteHabitModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function GrowthThnDeleteHabitModal({
  visible,
  onCancel,
  onConfirm,
}: GrowthThnDeleteHabitModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.growthThnOverlay} onPress={onCancel}>
        <Pressable style={styles.growthThnSheet} onPress={() => {}}>
          <Text style={styles.growthThnTitle}>Delete Habit?</Text>
          <Text style={styles.growthThnBody}>
            This habit and its progress will be permanently removed.
          </Text>
          <Pressable style={styles.growthThnDeleteButton} onPress={onConfirm}>
            <Text style={styles.growthThnDeleteText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.growthThnCancelButton} onPress={onCancel}>
            <Text style={styles.growthThnCancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  growthThnOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  growthThnSheet: {
    backgroundColor: growthThnColors.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 24,
    gap: 12,
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  growthThnBody: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  growthThnDeleteButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: growthThnColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnDeleteText: {
    color: growthThnColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  growthThnCancelButton: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnCancelText: {
    color: growthThnColors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
});
