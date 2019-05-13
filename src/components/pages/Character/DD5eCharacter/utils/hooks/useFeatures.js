import { useEffect, useState } from 'react';

const useFeatures = (background, backgroundsData, featuresData) => {
  const [backgroundFeatures, setBackgroundFeatures] = useState([]);

  useEffect(() => {
    const newBackgroundFeatures = backgroundsData[background].features.reduce((acc, feature) => {
      const newFeature = Object.assign(featuresData[feature], {
        name: feature,
        sourceType: 'background',
        source: background,
      });
      return [newFeature, ...acc];
    }, []);
    setBackgroundFeatures(newBackgroundFeatures);
  }, []);

  return [...backgroundFeatures];
};

export default useFeatures;
