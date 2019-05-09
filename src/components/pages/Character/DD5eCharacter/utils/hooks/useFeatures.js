import { useEffect, useState } from 'react';

const useFeatures = (character, game) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const newFeatures = game.backgrounds[character.background].features.reduce((acc, feature) => {
      const newFeature = Object.assign(feature, {
        sourceType: 'Background',
        source: 'Entertainer',
      });
      return [newFeature, ...acc];
    }, []);
    setFeatures(newFeatures);
  }, [character]);

  return features;
};

export default useFeatures;
