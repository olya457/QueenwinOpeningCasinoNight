import React from 'react';
import {StyleSheet, View} from 'react-native';

const matrix = [
  [1,1,1,1,1,0,1,0,1,1,1,0,1,0],
  [1,0,0,0,1,0,1,0,0,0,1,0,1,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,0,1],
  [1,0,0,0,1,0,0,0,1,0,1,1,1,1],
  [1,1,1,1,1,0,1,0,1,0,1,0,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,1,0],
  [1,1,1,0,1,1,1,1,1,0,1,0,1,1],
  [0,0,1,0,0,0,1,0,1,0,0,1,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,1,1,1],
  [1,0,0,0,1,0,0,1,0,0,1,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,0],
  [1,0,0,0,1,0,1,0,1,0,0,0,1,0],
  [1,1,1,1,1,0,1,1,1,1,1,0,1,1],
  [0,1,0,1,0,0,1,0,0,1,0,0,1,0],
];

export function FauxQrCode() {
  return (
    <View style={styles.wrap}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View key={`${rowIndex}-${cellIndex}`} style={[styles.cell, cell ? styles.filled : styles.empty]} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 10,
    height: 10,
  },
  filled: {
    backgroundColor: '#101522',
  },
  empty: {
    backgroundColor: '#fff',
  },
});
