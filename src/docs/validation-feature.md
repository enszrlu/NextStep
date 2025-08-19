# Sistema de Validação de Steps - NextStep

## Visão Geral

O sistema de validação de steps permite que você defina validações customizadas para steps específicos, garantindo que o usuário execute ações necessárias antes de avançar no tour.

## Características

- ✅ **Validações customizadas por step**
- ✅ **Mensagens de erro personalizáveis**
- ✅ **Feedback visual durante validação**
- ✅ **Compatível com todos os adapters**
- ✅ **Performance otimizada** (validação apenas quando necessário)

## Como Usar

### 1. Definindo uma Validação

Adicione a propriedade `validation` ao step que precisa de validação:

```typescript
import { Tour, StepValidation } from 'nextstepjs';

const steps: Tour[] = [
  {
    tour: 'meu-tour',
    steps: [
      {
        icon: '📋',
        title: 'Abrir Modal',
        content: 'Clique no botão para abrir o modal',
        selector: '#modal-button',
        validation: {
          validate: () => {
            // Sua lógica de validação aqui
            return isModalOpen; // deve retornar boolean ou Promise<boolean>
          },
          errorMessage: 'Por favor, abra o modal antes de continuar',
          required: true, // opcional
        },
      },
    ],
  },
];
```

### 2. Interface StepValidation

```typescript
interface StepValidation {
  validate: () => boolean | Promise<boolean>;
  errorMessage?: string;
  required?: boolean;
}
```

#### Propriedades:

- **`validate`**: Função que retorna `true` se a validação passar, `false` caso contrário
- **`errorMessage`**: Mensagem de erro customizada (opcional)
- **`required`**: Indica se a validação é obrigatória (opcional, padrão: `true`)

### 3. Exemplos de Validação

#### Verificar se um modal está aberto:

```typescript
{
  validation: {
    validate: () => {
      const modal = document.querySelector('.modal');
      return modal && !modal.classList.contains('hidden');
    },
    errorMessage: 'O modal precisa estar aberto para continuar',
  },
}
```

#### Verificar se um campo foi preenchido:

```typescript
{
  validation: {
    validate: () => {
      const input = document.querySelector('#email-input') as HTMLInputElement;
      return input && input.value.trim().length > 0;
    },
    errorMessage: 'Por favor, preencha o campo de email',
  },
}
```

#### Validação assíncrona:

```typescript
{
  validation: {
    validate: async () => {
      try {
        const response = await fetch('/api/validate');
        return response.ok;
      } catch {
        return false;
      }
    },
    errorMessage: 'Erro na validação. Tente novamente.',
  },
}
```

#### Verificar estado do React:

```typescript
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const steps: Tour[] = [
  {
    tour: 'dropdown-tour',
    steps: [
      {
        validation: {
          validate: () => isDropdownOpen,
          errorMessage: 'Abra o dropdown para continuar',
        },
      },
    ],
  },
];
```

## Comportamento

### Fluxo de Validação

1. **Usuário clica em "Next"**
2. **Sistema executa validação** (se definida)
3. **Se validação passar**: Avança para próximo step
4. **Se validação falhar**: Exibe mensagem de erro e mantém no step atual

### Estados Visuais

- **Durante validação**: Botão "Next" fica desabilitado e mostra "Validando..."
- **Erro de validação**: Mensagem de erro aparece no card
- **Validação bem-sucedida**: Avança normalmente

### Limpeza de Estado

- Mensagens de erro são limpas automaticamente ao mudar de step
- Estado de validação é resetado a cada mudança de step

## Compatibilidade

O sistema de validação é compatível com:

- ✅ Next.js
- ✅ React Router
- ✅ Remix
- ✅ Window (SPA)

## Performance

- Validações são executadas apenas quando o usuário tenta avançar
- Não há polling ou verificações contínuas
- Validações assíncronas são suportadas
- Estados são limpos automaticamente para evitar vazamentos de memória

## Exemplo Completo

```typescript
import React, { useState } from 'react';
import NextStep from 'nextstepjs';
import { Tour } from 'nextstepjs/types';

const MyComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const steps: Tour[] = [
    {
      tour: 'validation-demo',
      steps: [
        {
          icon: '👋',
          title: 'Bem-vindo',
          content: 'Este tour demonstra validações customizadas',
          selector: '#welcome',
        },
        {
          icon: '📋',
          title: 'Abrir Modal',
          content: 'Clique para abrir o modal',
          selector: '#modal-button',
          validation: {
            validate: () => isModalOpen,
            errorMessage: 'Por favor, abra o modal antes de continuar',
          },
        },
        {
          icon: '🔽',
          title: 'Abrir Dropdown',
          content: 'Agora abra o dropdown',
          selector: '#dropdown-button',
          validation: {
            validate: () => isDropdownOpen,
            errorMessage: 'Você precisa abrir o dropdown',
          },
        },
      ],
    },
  ];

  return (
    <NextStep steps={steps}>
      <div>
        <button id="welcome">Iniciar</button>
        <button 
          id="modal-button" 
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {isModalOpen ? 'Modal Aberto' : 'Abrir Modal'}
        </button>
        <button 
          id="dropdown-button" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {isDropdownOpen ? 'Dropdown Aberto' : 'Abrir Dropdown'}
        </button>
      </div>
    </NextStep>
  );
};
```

## Troubleshooting

### Validação não está funcionando

1. Verifique se a função `validate` está retornando `boolean` ou `Promise<boolean>`
2. Confirme se o step tem a propriedade `validation` definida
3. Verifique se não há erros no console

### Mensagem de erro não aparece

1. Confirme se a propriedade `errorMessage` está definida
2. Verifique se a função `validate` está retornando `false`
3. Verifique se não há erros de CSS que possam estar ocultando a mensagem

### Validação assíncrona não funciona

1. Certifique-se de que a função `validate` é `async`
2. Verifique se está retornando `Promise<boolean>`
3. Confirme se não há erros na função assíncrona
