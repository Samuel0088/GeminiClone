// Importa as configurações do ESLint para JavaScript.
import js from '@eslint/js'

// Importa o plugin de regras do React.
import react from 'eslint-plugin-react'

// Importa o plugin de regras de hooks no React.
import reactHooks from 'eslint-plugin-react-hooks'

// Importa o plugin para lidar com o React Refresh (hot reloading).
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    // Aplica as configurações a todos os arquivos .js e .jsx.
    files: ['**/*.{js,jsx}'],
    
    languageOptions: {
      ecmaVersion: 2020,  // Define a versão do ECMAScript como 2020.
      globals: globals.browser,  // Define as variáveis globais para o navegador.
      parserOptions: {
        ecmaVersion: 'latest',  // Usa a versão mais recente do ECMAScript.
        ecmaFeatures: { jsx: true },  // Habilita suporte a JSX.
        sourceType: 'module',  // Configura o código para usar módulos ES6 (import/export).
      },
    },
    
    // Define a versão do React a ser usada.
    settings: { react: { version: '18.3' } },

    plugins: {
      react,  // Plugin de regras do React.
      'react-hooks': reactHooks,  // Plugin de regras de hooks do React.
      'react-refresh': reactRefresh,  // Plugin de regras de React Refresh.
    },

    rules: {
      // Adiciona as regras recomendadas para JS, React, JSX, e hooks.
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      // Desativa a regra que avisa sobre o uso de 'target="_blank"' em links.
      'react/jsx-no-target-blank': 'off',
      
      // Adiciona um aviso se houver exportação de componentes sem ser os principais.
      'react-refresh/only-export-components': [
        'warn',  // Nível de alerta.
        { allowConstantExport: true },  // Permite exportações constantes sem gerar alerta.
      ],
    },
  },
]
