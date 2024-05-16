import React from 'react';
interface NavbarProps {
  icon: any;
  value: string;
  label: string;
}
const StatCard = ({ icon, value, label }: NavbarProps) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex items-center">
      <div className="text-blue-500 mr-4">{icon}</div>
      <div>
        <h2 className="text-xl font-bold">{value}</h2>
        <p className="text-gray-400">{label}</p>
      
      </div>
    </div>
  );
};

export default StatCard;
