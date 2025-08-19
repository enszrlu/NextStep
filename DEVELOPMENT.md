# NextStep - Guia de Desenvolvimento

## Como testar localmente

### Opção 1: Usando npm link

1. **Na pasta da biblioteca:**
```bash
npm install
npm run build
npm link
```

2. **No seu projeto de teste:**
```bash
npm link nextstepjs
```

3. **Para desfazer o link:**
```bash
# No projeto de teste
npm unlink nextstepjs

# Na biblioteca
npm unlink
```

### Opção 2: Usando Git URL

1. **Faça push para um repositório Git:**
```bash
git add .
git commit -m "feat: add validation system"
git push origin main
```

2. **No seu projeto de teste:**
```bash
npm install git+https://github.com/seu-usuario/NextStep.git
```

### Opção 3: Usando npm pack

1. **Na pasta da biblioteca:**
```bash
npm run build
npm pack
```

2. **No seu projeto de teste:**
```bash
npm install /caminho/para/nextstepjs-2.1.1.tgz
```

## Scripts disponíveis

- `npm run build` - Compila o TypeScript
- `npm run build:watch` - Compila em modo watch
- `npm run start` - Build e executa

## Estrutura do projeto

```
src/
├── adapters/          # Adaptadores de navegação
├── types/            # Definições de tipos TypeScript
├── examples/         # Exemplos de uso
├── docs/            # Documentação
├── tests/           # Testes
├── NextStep.tsx     # Componente principal
├── NextStepReact.tsx # Implementação React
├── NextStepContext.tsx # Context API
├── DefaultCard.tsx  # Card padrão
└── index.ts         # Ponto de entrada
```

## Nova funcionalidade: Sistema de Validação

### Como usar:

```typescript
import { NextStep, NextStepProvider } from 'nextstepjs';
import { Tour, StepValidation } from 'nextstepjs/types';

const steps: Tour[] = [
  {
    tour: 'validation-demo',
    steps: [
      {
        icon: '📋',
        title: 'Abrir Modal',
        content: 'Clique no botão para abrir o modal',
        selector: '#modal-button',
        validation: {
          validate: () => isModalOpen,
          errorMessage: 'Por favor, abra o modal antes de continuar',
        },
      },
    ],
  },
];
```

### Interface StepValidation:

```typescript
interface StepValidation {
  validate: () => boolean | Promise<boolean>;
  errorMessage?: string;
  required?: boolean;
}
```

## Desenvolvimento

1. **Instale as dependências:**
```bash
npm install
```

2. **Compile em modo watch:**
```bash
npm run build:watch
```

3. **Teste em outro projeto:**
Use uma das opções acima para testar localmente.

## Publicação

1. **Atualize a versão:**
```bash
npm version patch  # ou minor, major
```

2. **Build e publique:**
```bash
npm run build
npm publish
```
