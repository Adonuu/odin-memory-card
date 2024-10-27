import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { getChampionNames, getChampionImageSource } from './api.js';
import { CardContainer } from './components/cardContainer.jsx';

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedChampions, setClickedChampions] = useState([]);
  const [champions, setChampions] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchChampions() {
      try {
        const names = await getChampionNames();
        setChampions(names);
      } catch (error) {
        console.error("Error fetching champion names:", error);
      }
    }
    fetchChampions();
  }, []);

  useEffect(() => {
    if (champions.length > 0) {
      setImages(getRandomElementsWithoutDuplicates(champions, 8));
    }
  }, [champions]);

  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomElementsWithoutDuplicates(array, numElements) {
    if (numElements > array.length) {
      throw new Error("Not enough elements in the array to select without duplicates.");
    }
    const shuffledArray = shuffleArray([...array]);
    return shuffledArray.slice(0, numElements);
  }

  const cardArray = useMemo(() => {
    return images.map((value) => ({
      imageSrc: getChampionImageSource(value),
      championName: value,
      handleClick: (e) => handleClick(e),
    }));
  }, [images]);

  function handleClick(e) {
    const clickedChampion = e.target.alt;
    const isClicked = checkClickedChampion(clickedChampion);

    if (isClicked) {
      resetGame();
    } else {
      setClickedChampions([...clickedChampions, clickedChampion]); // Update without mutating state
      setPlayerScore(playerScore + 1);
      if (playerScore + 1 > bestScore) {
        setBestScore(playerScore + 1);
      }
      setImages(getRandomElementsWithoutDuplicates(champions, 8));
    }
  }

  function resetGame() {
    setPlayerScore(0);
    setClickedChampions([]); // Clear clicked champions
    setImages(getRandomElementsWithoutDuplicates(champions, 8));
  }

  function checkClickedChampion(champion) {
    return Array.isArray(clickedChampions) && clickedChampions.some((value) => value === champion);
  }
  

  return (
    <>
      <CardContainer cards={cardArray} />
    </>
  );
}

export default App;
