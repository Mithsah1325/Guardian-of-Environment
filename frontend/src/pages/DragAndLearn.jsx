import React, { useState } from 'react';

const DragAndLearn = () => {
  const [categories, setCategories] = useState({
    "Reduce, Reuse, Recycle": [],
    "Renewable Energy": [],
    "Water Conservation": [],
  });

  const items = [
    { id: 1, text: "Use reusable bags", category: "Reduce, Reuse, Recycle" },
    { id: 2, text: "Solar panels", category: "Renewable Energy" },
    { id: 3, text: "Fix leaky faucets", category: "Water Conservation" },
    { id: 4, text: "Compost food scraps", category: "Reduce, Reuse, Recycle" },
    { id: 5, text: "Wind turbines", category: "Renewable Energy" },
    { id: 6, text: "Collect rainwater", category: "Water Conservation" },
  ];

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (categoryName) => {
    if (draggedItem && draggedItem.category === categoryName) {
      setCategories((prev) => ({
        ...prev,
        [categoryName]: [...prev[categoryName], draggedItem],
      }));
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 bg-blue-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-6">
        Drag and Learn: Environmental Education
      </h1>
      <div className="flex gap-6">
        {/* Drag items */}
        <div className="w-1/3">
          <h3 className="text-lg font-semibold mb-4">Drag Items</h3>
          <div className="space-y-2">
            {items
              .filter(
                (item) =>
                  !Object.values(categories)
                    .flat()
                    .find((dragged) => dragged.id === item.id)
              )
              .map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className="p-4 bg-white border rounded shadow cursor-pointer hover:bg-gray-100"
                >
                  {item.text}
                </div>
              ))}
          </div>
        </div>

        {/* Drop zones */}
        <div className="w-2/3 grid grid-cols-3 gap-4">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              onDrop={() => handleDrop(category)}
              onDragOver={handleDragOver}
              className="p-4 bg-green-100 border-2 border-green-300 rounded shadow-md min-h-[100px]"
            >
              <h4 className="font-semibold text-center mb-2">{category}</h4>
              <div className="space-y-1">
                {categories[category].map((item) => (
                  <div
                    key={item.id}
                    className="p-2 bg-green-300 text-white rounded shadow"
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {Object.values(categories).flat().length === items.length && (
        <div className="mt-6 p-4 bg-white border rounded shadow">
          <h3 className="text-lg font-bold">Well Done!</h3>
          <p>
            Here's what you learned:
            <ul className="mt-2 list-disc pl-6">
              <li>
                **Reduce, Reuse, Recycle**: Practices like reusing bags and
                composting reduce waste and help the environment.
              </li>
              <li>
                **Renewable Energy**: Solar panels and wind turbines provide
                clean, sustainable energy sources.
              </li>
              <li>
                **Water Conservation**: Actions like fixing leaks and collecting
                rainwater conserve precious water resources.
              </li>
            </ul>
          </p>
        </div>
      )}
    </div>
  );
};

export default DragAndLearn;
