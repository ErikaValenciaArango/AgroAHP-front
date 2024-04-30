import React from 'react';

const CriteriaInput = ({ criteria, onChange }) => {
  return (
    <div>
      <h3>Criterios</h3>
      {criteria.map((criterion, index) => (
        <div key={index}>
          <label>{`Criterio ${index + 1}: `}</label>
          <input
            type="text"
            value={criterion}
            onChange={(e) => onChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default CriteriaInput;
