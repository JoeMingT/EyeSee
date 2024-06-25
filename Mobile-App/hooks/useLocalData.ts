import { DATABASE_PATH } from '@EyeSee/constants/constants';
import { useFocusEffect } from '@react-navigation/native';
import { readAsStringAsync, writeAsStringAsync } from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';

interface LocalDataInterface {
  imageUri: string;
  results: string;
  date: string;
  type: 'Describe Scene' | 'Detect Text' | 'Detect Objects';
}

const useLocalData = () => {
  const [localData, setLocalData] = useState<LocalDataInterface[]>([]);

  // To load the data
  useEffect(() => {
    readAsStringAsync(DATABASE_PATH).then((data) => {
      setLocalData(JSON.parse(data));
    });
  }, []);

  const updateLocalData = (newData: LocalDataInterface[]) => {
    setLocalData(newData);
  };

  const readLocalDataFromDB = () => {
    const data = readAsStringAsync(DATABASE_PATH).then((data) => {
      setLocalData(JSON.parse(data));
      return JSON.parse(data);
    });
    return data;
  };

  const saveLocalData = () => {
    const savedData = writeAsStringAsync(DATABASE_PATH, JSON.stringify(localData))
      .then(() => console.log('Data Saved'))
      .catch((err) => {
        console.log(err);
      });
  };

  return { localData, updateLocalData, saveLocalData, readLocalDataFromDB };
};

export { useLocalData };
