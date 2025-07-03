import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const TILE_SIZE = Math.floor(Dimensions.get('window').width / GRID_SIZE);

const isSolvable = (tiles: number[]): boolean => {
  let inversions = 0;
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(0) / GRID_SIZE);
  return GRID_SIZE % 2 === 1
    ? inversions % 2 === 0
    : (inversions + emptyRow) % 2 === 1;
};

const generateShuffledTiles = (): number[] => {
  let tiles: number[];
  do {
    tiles = Array.from({ length: TILE_COUNT }, (_, i) => i).sort(() => Math.random() - 0.5);
  } while (!isSolvable(tiles));
  return tiles;
};

const isAdjacent = (i: number, j: number): boolean => {
  const row1 = Math.floor(i / GRID_SIZE);
  const col1 = i % GRID_SIZE;
  const row2 = Math.floor(j / GRID_SIZE);
  const col2 = j % GRID_SIZE;
  return (
    (row1 === row2 && Math.abs(col1 - col2) === 1) ||
    (col1 === col2 && Math.abs(row1 - row2) === 1)
  );
};

const isSolved = (tiles: number[]): boolean => {
  for (let i = 0; i < TILE_COUNT - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[TILE_COUNT - 1] === 0;
};

export default function TilePuzzleScreen() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newTiles = generateShuffledTiles();
    setTiles(newTiles);
    setSolved(false);
  };

  const handleTilePress = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    if (isSolved(newTiles)) {
      setTimeout(() => {
        setSolved(true);
      }, 200);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Slide Puzzle</Text>
      <View style={styles.grid}>
        {tiles.map((tile, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tile, tile === 0 && styles.emptyTile]}
            onPress={() => handleTilePress(index)}
            disabled={tile === 0}
          >
            {tile !== 0 && <Text style={styles.tileText}>{tile}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      {/* Custom centered modal */}
      <Modal visible={solved} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Puzzle Solved!</Text>
            <TouchableOpacity onPress={resetGame} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  grid: {
    width: TILE_SIZE * GRID_SIZE,
    height: TILE_SIZE * GRID_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  tileText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyTile: {
    backgroundColor: '#222',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#00b894',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
