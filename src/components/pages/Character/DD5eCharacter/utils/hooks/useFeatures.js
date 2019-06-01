import { useEffect, useState } from 'react';

const useFeatures = (background, backgroundsData, race, featuresData) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const backgroundFeatures = backgroundsData[background].features.reduce((acc, feature) => {
      const newFeature = Object.assign(featuresData[feature], {
        name: feature,
        sourceType: 'background',
        source: background,
      });
      return [newFeature, ...acc];
    }, []);

    const raceFeatures = race.features
      ? race.features.reduce((acc, feature) => {
        const newFeature = Object.assign(featuresData[feature], {
          name: feature,
          sourceType: 'race',
          source: race.name,
        });
        return [newFeature, ...acc];
      }, [])
      : [];

    setFeatures([...backgroundFeatures, ...raceFeatures]);
  }, [race]);

  return features;
};

export default useFeatures;
