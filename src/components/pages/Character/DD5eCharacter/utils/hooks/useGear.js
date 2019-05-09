import { useEffect, useState } from 'react';

const useGear = (charGear, gameItems) => {
  const [gear, setGear] = useState([]);

  useEffect(() => {
    const newGear = charGear.reduce((acc, key) => [gameItems[key], ...acc], []);

    setGear(newGear);
  }, [charGear]);

  return gear;
};

export default useGear;
