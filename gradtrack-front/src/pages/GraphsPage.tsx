import React from 'react';
import Graphs from './Graphs';
import Header from '../components/Header';

const GraphsPage: React.FC = () => {
  return (
    <>
        <Header title="Evaluaciones"/>
        <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
            <Graphs />
        </div>
        </div>
    </>
  );
};

export default GraphsPage;