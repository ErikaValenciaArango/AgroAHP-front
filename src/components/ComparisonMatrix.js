import React from 'react';

const ComparisonMatrix = ({ criteria, onComparisonChange }) => {
  return (
    <div>
      <h3>Matriz de Comparación Pareada</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {criteria.map((criterion, index) => (
              <th key={index}>{`Criterio ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, rowIndex) => (
            <tr key={rowIndex}>
              <td>{`Criterio ${rowIndex + 1}`}</td>
              {criteria.map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    onChange={(e) =>
                      onComparisonChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonMatrix;
