import React, { useState } from 'react';
import NextStep from '../NextStep';
import { Tour } from '../types';

const ValidationExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const steps: Tour[] = [
    {
      tour: 'validation-demo',
      steps: [
        {
          icon: '👋',
          title: 'Welcome to validation example',
          content: 'This is an example of how to use custom validations in steps.',
          selector: '#welcome-button',
        },
        {
          icon: '📋',
          title: 'Click to open modal',
          content: 'You need to click the button below to open the modal before continuing.',
          selector: '#modal-button',
          validation: {
            validate: () => {
              // Check if modal is open
              return isModalOpen;
            },
            errorMessage: 'Please click the button to open the modal before continuing.',
            required: true,
          },
        },
        {
          icon: '🔽',
          title: 'Now open the dropdown',
          content: 'Click the dropdown to open it before proceeding.',
          selector: '#dropdown-button',
          validation: {
            validate: () => {
              // Check if dropdown is open
              return isDropdownOpen;
            },
            errorMessage: 'You need to open the dropdown to continue.',
            required: true,
          },
        },
        {
          icon: '✅',
          title: 'Congratulations!',
          content: 'You completed all validations successfully!',
          selector: '#success-message',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <NextStep steps={steps}>
        <div>
          <h1>Step Validation Example</h1>

          <div style={{ marginBottom: '2rem' }}>
            <button
              id="welcome-button"
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
                <p>This modal needs to be open to continue the tour.</p>
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

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                id="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isDropdownOpen ? '#10B981' : '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                {isDropdownOpen ? 'Dropdown Open ✓' : 'Open Dropdown'}
              </button>

              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '0.5rem',
                    padding: '1rem',
                    backgroundColor: 'white',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                  }}
                >
                  <h4>Dropdown Options</h4>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                  </ul>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#6B7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            id="success-message"
            style={{
              padding: '1rem',
              backgroundColor: '#D1FAE5',
              border: '1px solid #A7F3D0',
              borderRadius: '0.375rem',
              color: '#065F46',
            }}
          >
            <h3>🎉 Success!</h3>
            <p>You completed all tour validations!</p>
          </div>
        </div>
      </NextStep>
    </div>
  );
};

export default ValidationExample;
