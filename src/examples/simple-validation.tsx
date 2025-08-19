import React, { useState } from 'react';
import NextStep from '../NextStep';
import { Tour } from '../types';

const SimpleValidationExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps: Tour[] = [
    {
      tour: 'simple-validation',
      steps: [
        {
          icon: '👋',
          title: 'Welcome',
          content: 'This example shows how to use simple validations.',
          selector: '#welcome',
        },
        {
          icon: '📋',
          title: 'Open Modal',
          content: 'Click the button to open the modal. You cannot continue until the modal is open.',
          selector: '#modal-button',
          validation: {
            validate: () => isModalOpen,
            errorMessage: 'You need to open the modal before continuing!',
          },
        },
        {
          icon: '✅',
          title: 'Success!',
          content: 'Congratulations! You completed the validation successfully.',
          selector: '#success',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <NextStep steps={steps}>
        <div>
          <h1>Simple Validation Example</h1>

          <div style={{ marginBottom: '2rem' }}>
            <button
              id="welcome"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Start Tour
            </button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <button
              id="modal-button"
              onClick={() => setIsModalOpen(!isModalOpen)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isModalOpen ? '#10B981' : '#F59E0B',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              {isModalOpen ? 'Modal Open ✓' : 'Open Modal'}
            </button>

            {isModalOpen && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                }}
              >
                <h3>Modal Open</h3>
                <p>Now you can continue the tour!</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#DC2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Close Modal
                </button>
              </div>
            )}
          </div>

          <div
            id="success"
            style={{
              padding: '1rem',
              backgroundColor: '#D1FAE5',
              border: '1px solid #A7F3D0',
              borderRadius: '0.375rem',
              color: '#065F46',
            }}
          >
            <h3>🎉 Congratulations!</h3>
            <p>You completed the validation tour!</p>
          </div>
        </div>
      </NextStep>
    </div>
  );
};

export default SimpleValidationExample;
