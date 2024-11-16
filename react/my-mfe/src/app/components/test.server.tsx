import React from 'react';

const ServerComponent = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Hello from Server Component</h1>
      <p className="text-gray-700">This component renders without HTML, HEAD, or BODY tags</p>
    </div>
  );
};

export default ServerComponent;