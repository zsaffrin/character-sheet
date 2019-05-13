import { useEffect, useState } from 'react';

const useProficiencies = (charProfs) => {
  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    const newProficiencies = charProfs;

    setProficiencies(newProficiencies);
  }, []);

  return proficiencies;
};

export default useProficiencies;
