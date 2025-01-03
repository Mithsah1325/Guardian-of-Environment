import React, { useState } from 'react';
import ImageUpload from '../components/PlantIdentity/ImageUpload';
import PlantInfo from '../components/PlantIdentity/PlantInfo';

function Plantify() {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Plantify</h1>
        <ImageUpload 
          setPlantData={setPlantData}
          setIsLoading={setIsLoading}
        />
        {isLoading && (
          <div className="text-center my-4">
            <p className="text-gray-600">Analyzing plant...</p>
          </div>
        )}
        {plantData && <PlantInfo plantData={plantData} />}
      </div>
    </div>
  );
}

export default Plantify;