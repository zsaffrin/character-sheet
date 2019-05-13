import { useEffect, useState } from 'react';

const useProficiencies = (classDetails, charProfs) => {
  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    const classProfs = classDetails.reduce((acc, cd) => [...cd.proficiencies, ...acc], []);
    const newProficiencies = [...classProfs, ...charProfs];

    setProficiencies(newProficiencies);
  }, [classDetails]);

  return proficiencies;
};

export default useProficiencies;
