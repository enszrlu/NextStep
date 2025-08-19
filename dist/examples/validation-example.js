import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import NextStep from '../NextStep';
const ValidationExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const steps = [
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
    return (_jsx("div", { style: { padding: '2rem', fontFamily: 'Arial, sans-serif' }, children: _jsx(NextStep, { steps: steps, children: _jsxs("div", { children: [_jsx("h1", { children: "Exemplo de Valida\u00E7\u00E3o de Steps" }), _jsx("div", { style: { marginBottom: '2rem' }, children: _jsx("button", { id: "welcome-button", style: {
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
                                }, children: [_jsx("h3", { children: "Modal Aberto" }), _jsx("p", { children: "Este modal precisa estar aberto para continuar o tour." }), _jsx("button", { onClick: () => setIsModalOpen(false), style: {
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#DC2626',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                        }, children: "Fechar Modal" })] }))] }), _jsx("div", { style: { marginBottom: '2rem' }, children: _jsxs("div", { style: { position: 'relative', display: 'inline-block' }, children: [_jsx("button", { id: "dropdown-button", onClick: () => setIsDropdownOpen(!isDropdownOpen), style: {
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: isDropdownOpen ? '#10B981' : '#8B5CF6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                    }, children: isDropdownOpen ? 'Dropdown Aberto ✓' : 'Abrir Dropdown' }), isDropdownOpen && (_jsxs("div", { style: {
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
                                    }, children: [_jsx("h4", { children: "Op\u00E7\u00F5es do Dropdown" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '1rem' }, children: [_jsx("li", { children: "Op\u00E7\u00E3o 1" }), _jsx("li", { children: "Op\u00E7\u00E3o 2" }), _jsx("li", { children: "Op\u00E7\u00E3o 3" })] }), _jsx("button", { onClick: () => setIsDropdownOpen(false), style: {
                                                marginTop: '0.5rem',
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: '#6B7280',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.25rem',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                            }, children: "Fechar" })] }))] }) }), _jsxs("div", { id: "success-message", style: {
                            padding: '1rem',
                            backgroundColor: '#D1FAE5',
                            border: '1px solid #A7F3D0',
                            borderRadius: '0.375rem',
                            color: '#065F46',
                        }, children: [_jsx("h3", { children: "\uD83C\uDF89 Sucesso!" }), _jsx("p", { children: "Voc\u00EA completou todas as valida\u00E7\u00F5es do tour!" })] })] }) }) }));
};
export default ValidationExample;
