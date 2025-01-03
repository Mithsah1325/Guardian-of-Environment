import React, { useState } from 'react';
import { Recycle, TreePine, Leaf, Trash2 } from 'lucide-react';

const EcoMissionGame = () => {
  const [score, setScore] = useState(0);  // Start with score 0
  const [level, setLevel] = useState(1);
  const [ecoCoins, setEcoCoins] = useState(0);
  const [currentMission, setCurrentMission] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [missionProgress, setMissionProgress] = useState(0);

  const items = [
    { id: 1, name: 'Plastic Bottle', type: 'recycle', image: '🍾' },
    { id: 2, name: 'Banana Peel', type: 'compost', image: '🍌' },
    { id: 3, name: 'Paper', type: 'recycle', image: '📄' },
    { id: 4, name: 'Glass Jar', type: 'recycle', image: '🫙' },
    { id: 5, name: 'Food Waste', type: 'compost', image: '🥘' },
    { id: 6, name: 'Plastic Bag', type: 'recycle', image: '🛍️' },
    { id: 7, name: 'Apple Core', type: 'compost', image: '🍏' },
    { id: 8, name: 'Cardboard', type: 'recycle', image: '📦' },
    { id: 9, name: 'Aluminum Can', type: 'recycle', image: '🥤' },
    { id: 10, name: 'Eggshells', type: 'compost', image: '🥚' },
    { id: 11, name: 'Cans', type: 'recycle', image: '🍶' },
    { id: 12, name: 'Orange Peel', type: 'compost', image: '🍊' },
    { id: 13, name: 'Styrofoam', type: 'recycle', image: '🧴' },
    { id: 14, name: 'Vegetable Scraps', type: 'compost', image: '🥕' },
    { id: 15, name: 'Tetra Pak', type: 'recycle', image: '🧃' }
  ];

  const missions = {
    recycling: {
      title: 'Recycling Challenge',
      description: 'Sort the items into the correct bins',
      items: items // Include all 15 items
    },
    planting: {
      title: 'Plant a Tree',
      description: 'Follow the steps to plant a virtual tree',
      steps: ['Select Location', 'Dig Hole', 'Plant Seedling', 'Add Soil', 'Water']
    }
  };

  const startMission = (missionType) => {
    setCurrentMission(missions[missionType]);
    setMissionProgress(0);
    if (missionType === 'recycling') {
      setCurrentItem(missions.recycling.items[0]);
    } else if (missionType === 'planting') {
      setCurrentItem(null); // Not applicable for planting
    }
  };

  const handleBinSelection = (binType) => {
    if (!currentItem) return;

    if (currentItem.type === binType) {
      setScore(score + 10); // Add 10 points for correct bin selection
      setEcoCoins(ecoCoins + 5);

      const nextItemIndex = missionProgress + 1;
      if (nextItemIndex < missions.recycling.items.length) {
        setCurrentItem(missions.recycling.items[nextItemIndex]);
        setMissionProgress(nextItemIndex);
      } else {
        // Check if the score is still greater than 0 before continuing
        if (score > 0) {
          setCurrentItem(null);
          setCurrentMission(null);
        } else {
          setCurrentMission(null); // End mission if score is 0 or below
        }
      }
    } else {
      setScore(Math.max(0, score - 5)); // Deduct score if incorrect
    }
  };

  const handlePlantingStep = () => {
    const nextStep = missionProgress + 1;
    if (nextStep < missions.planting.steps.length) {
      setMissionProgress(nextStep);
      setScore(score + 10);
      setEcoCoins(ecoCoins + 5);
    } else {
      setCurrentMission(null);
      setScore(score + 20);
      setEcoCoins(ecoCoins + 10);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">Eco-Missions</span>
        <div className="flex gap-4">
          <span className="badge">Level {level}</span>
          <span className="badge">Score: {score}</span>
          <span className="badge">🌱 {ecoCoins}</span>
        </div>
      </div>

      {!currentMission ? (
        <div className="grid grid-cols-2 gap-4">
          <button 
            className="p-6 flex flex-col items-center gap-2 bg-green-500 text-white rounded-md"
            onClick={() => startMission('recycling')}
          >
            <Recycle className="w-8 h-8" />
            <span>Recycling Challenge</span>
          </button>
          <button
            className="p-6 flex flex-col items-center gap-2 bg-green-500 text-white rounded-md"
            onClick={() => startMission('planting')}
          >
            <TreePine className="w-8 h-8" />
            <span>Plant a Tree</span>
          </button>
        </div>
      ) : currentMission.title === 'Recycling Challenge' ? (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              {currentItem ? `Sort: ${currentItem.name}` : 'Mission Complete!'}
            </h3>
            {currentItem && (
              <div className="text-4xl mb-4">{currentItem.image}</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              className="p-6 flex flex-col items-center gap-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleBinSelection('recycle')}
            >
              <Recycle className="w-8 h-8" />
              Recycling
            </button>
            <button
              className="p-6 flex flex-col items-center gap-2 bg-green-500 text-white rounded-md"
              onClick={() => handleBinSelection('compost')}
            >
              <Leaf className="w-8 h-8" />
              Compost
            </button>
            <button
              className="p-6 flex flex-col items-center gap-2 bg-gray-500 text-white rounded-md"
              onClick={() => handleBinSelection('trash')}
            >
              <Trash2 className="w-8 h-8" />
              Trash
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-center">
            {missions.planting.steps[missionProgress]}
          </h3>
          <div className="flex justify-center">
            <button onClick={handlePlantingStep} className="btn">
              {missionProgress < missions.planting.steps.length - 1 
                ? 'Next Step' 
                : 'Complete Mission'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoMissionGame;
