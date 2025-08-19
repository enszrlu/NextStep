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
          title: 'Bem-vindo ao exemplo de validação',
          content: 'Este é um exemplo de como usar validações customizadas nos steps.',
          selector: '#welcome-button',
        },
        {
          icon: '📋',
          title: 'Clique para abrir o modal',
          content: 'Você precisa clicar no botão abaixo para abrir o modal antes de continuar.',
          selector: '#modal-button',
          validation: {
            validate: () => {
              // Verifica se o modal está aberto
              return isModalOpen;
            },
            errorMessage: 'Por favor, clique no botão para abrir o modal antes de continuar.',
            required: true,
          },
        },
        {
          icon: '🔽',
          title: 'Agora abra o dropdown',
          content: 'Clique no dropdown para abri-lo antes de prosseguir.',
          selector: '#dropdown-button',
          validation: {
            validate: () => {
              // Verifica se o dropdown está aberto
              return isDropdownOpen;
            },
            errorMessage: 'Você precisa abrir o dropdown para continuar.',
            required: true,
          },
        },
        {
          icon: '✅',
          title: 'Parabéns!',
          content: 'Você completou todas as validações com sucesso!',
          selector: '#success-message',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <NextStep steps={steps}>
        <div>
          <h1>Exemplo de Validação de Steps</h1>

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
                <p>Este modal precisa estar aberto para continuar o tour.</p>
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
                {isDropdownOpen ? 'Dropdown Aberto ✓' : 'Abrir Dropdown'}
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
                  <h4>Opções do Dropdown</h4>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    <li>Opção 1</li>
                    <li>Opção 2</li>
                    <li>Opção 3</li>
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
                    Fechar
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
            <h3>🎉 Sucesso!</h3>
            <p>Você completou todas as validações do tour!</p>
          </div>
        </div>
      </NextStep>
    </div>
  );
};

export default ValidationExample;
