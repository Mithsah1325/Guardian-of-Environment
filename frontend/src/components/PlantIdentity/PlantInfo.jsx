import React from 'react';

function PlantInfo({ plantData }) {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2">{plantData.common_name}</h2>
      <h3 className="text-xl italic text-gray-600 mb-4">{plantData.scientific_name}</h3>
      <p className="text-gray-700 mb-6">{plantData.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Plant Details:</h4>
          <ul className="list-disc list-inside text-gray-700">
            <li>Family: {plantData.family}</li>
            <li>Native Region: {plantData.native_region}</li>
            <li>Growth Habit: {plantData.growth_habit}</li>
            <li>Flower Color: {plantData.flower_color}</li>
            <li>Leaf Type: {plantData.leaf_type}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlantInfo;
