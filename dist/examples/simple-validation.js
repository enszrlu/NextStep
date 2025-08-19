import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import NextStep from '../NextStep';
const SimpleValidationExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const steps = [
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
    return (_jsx("div", { style: { padding: '2rem', fontFamily: 'Arial, sans-serif' }, children: _jsx(NextStep, { steps: steps, children: _jsxs("div", { children: [_jsx("h1", { children: "Exemplo Simples de Valida\u00E7\u00E3o" }), _jsx("div", { style: { marginBottom: '2rem' }, children: _jsx("button", { id: "welcome", style: {
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#2563EB',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                            }, children: "Iniciar Tour" }) }), _jsxs("div", { style: { marginBottom: '2rem' }, children: [_jsx("button", { id: "modal-button", onClick: () => setIsModalOpen(!isModalOpen), style: {
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: isModalOpen ? '#10B981' : '#F59E0B',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                }, children: isModalOpen ? 'Modal Aberto ✓' : 'Abrir Modal' }), isModalOpen && (_jsxs("div", { style: {
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: '#F3F4F6',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '0.375rem',
                                }, children: [_jsx("h3", { children: "Modal Aberto" }), _jsx("p", { children: "Agora voc\u00EA pode continuar o tour!" }), _jsx("button", { onClick: () => setIsModalOpen(false), style: {
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#DC2626',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                        }, children: "Fechar Modal" })] }))] }), _jsxs("div", { id: "success", style: {
                            padding: '1rem',
                            backgroundColor: '#D1FAE5',
                            border: '1px solid #A7F3D0',
                            borderRadius: '0.375rem',
                            color: '#065F46',
                        }, children: [_jsx("h3", { children: "\uD83C\uDF89 Parab\u00E9ns!" }), _jsx("p", { children: "Voc\u00EA completou o tour com valida\u00E7\u00E3o!" })] })] }) }) }));
};
export default SimpleValidationExample;
