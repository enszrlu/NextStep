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
          title: 'Bem-vindo',
          content: 'Este exemplo mostra como usar validações simples.',
          selector: '#welcome',
        },
        {
          icon: '📋',
          title: 'Abrir Modal',
          content: 'Clique no botão para abrir o modal. Você não poderá continuar até que o modal esteja aberto.',
          selector: '#modal-button',
          validation: {
            validate: () => isModalOpen,
            errorMessage: 'Você precisa abrir o modal antes de continuar!',
          },
        },
        {
          icon: '✅',
          title: 'Sucesso!',
          content: 'Parabéns! Você completou a validação com sucesso.',
          selector: '#success',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <NextStep steps={steps}>
        <div>
          <h1>Exemplo Simples de Validação</h1>

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
              Iniciar Tour
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
              {isModalOpen ? 'Modal Aberto ✓' : 'Abrir Modal'}
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
                <h3>Modal Aberto</h3>
                <p>Agora você pode continuar o tour!</p>
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
                  Fechar Modal
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
            <h3>🎉 Parabéns!</h3>
            <p>Você completou o tour com validação!</p>
          </div>
        </div>
      </NextStep>
    </div>
  );
};

export default SimpleValidationExample;
