import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { getChampionNames, getChampionImageSource } from './api.js';
import { CardContainer } from './components/cardContainer.jsx';
import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';

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

  const shuffleArray = useCallback((array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const getRandomElementsWithoutDuplicates = useCallback((array, numElements) => {
    if (numElements > array.length) {
      throw new Error("Not enough elements in the array to select without duplicates.");
    }
    const shuffledArray = shuffleArray([...array]);
    return shuffledArray.slice(0, numElements);
  }, [shuffleArray]);

  const resetGame = useCallback(() => {
    setPlayerScore(0);
    setClickedChampions([]); // Clear clicked champions
    setImages(getRandomElementsWithoutDuplicates(champions, 8));
  }, [champions, getRandomElementsWithoutDuplicates]);

  const checkClickedChampion = useCallback((champion) => {
    return clickedChampions.includes(champion);
  }, [clickedChampions]);

  const handleClick = useCallback((e) => {
    const clickedChampion = e.target.alt;
    const isClicked = checkClickedChampion(clickedChampion);

    if (isClicked) {
      resetGame();
    } else {
      setClickedChampions((prev) => [...prev, clickedChampion]); // Update without mutating state
      setPlayerScore((prev) => {
        const newScore = prev + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
      setImages(getRandomElementsWithoutDuplicates(champions, 8));
    }
  }, [bestScore, champions, checkClickedChampion, getRandomElementsWithoutDuplicates, resetGame]);

  const cardArray = useMemo(() => {
    return images.map((value) => ({
      imageSrc: getChampionImageSource(value),
      championName: value,
      handleClick,
    }));
  }, [images, handleClick]);

  return (
    <>
      <Header playerScore={playerScore} bestScore={bestScore}></Header>
      <CardContainer cards={cardArray} />
      <Footer></Footer>
    </>
  );
}

export default App;