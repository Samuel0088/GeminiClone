import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"  // Importa as classes e enums necessários para usar o serviço de AI generativa da Google.

const MODEL_NAME = "gemini-1.0-pro"  // Define o nome do modelo de AI a ser usado.
const API_KEY = "AIzaSyASd4P4_tnqxfEixNMo_47GvrFUR18tmQY"  // Chave de API usada para autenticar as requisições à API.

async function runChat(prompt) {  // Função assíncrona 'runChat' que recebe um prompt e executa a conversa com o modelo de AI.
  const genAI = new GoogleGenerativeAI(API_KEY)  // Cria uma instância do serviço GoogleGenerativeAI usando a chave da API.
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });  // Obtém o modelo de AI generativo especificado.

  const generationConfig = {  // Configuração para o processo de geração de texto.
    temperature: 0.9,  // Controla a aleatoriedade das respostas geradas. Quanto maior, mais criativa.
    topK: 1,  // Limitando a resposta para a melhor escolha entre as K melhores opções.
    topP: 1,  // Usado em conjunto com topK para controle de diversidade das respostas geradas.
    maxOutputTokens: 2048,  // Define o limite de tokens (palavras, partes de palavras) para a resposta gerada.
  };

  const safetySettings = [  // Define categorias de segurança para garantir que respostas indesejadas sejam bloqueadas.
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,  // Categoria de assédio.
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,  // Bloqueia conteúdos de assédio com nível médio ou superior.
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,  // Categoria de discurso de ódio.
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,  // Bloqueia conteúdos de discurso de ódio com nível médio ou superior.
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,  // Categoria de conteúdo explicitamente sexual.
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,  // Bloqueia conteúdos explícitos com nível médio ou superior.
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,  // Categoria de conteúdo perigoso.
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,  // Bloqueia conteúdos perigosos com nível médio ou superior.
    },
  ];

  const chat = model.startChat({  // Inicia o chat com o modelo de AI.
    generationConfig,  // Passa a configuração de geração de texto.
    safetySettings,  // Passa as configurações de segurança.
    history: [  // Histórico de mensagens (inicialmente vazio, mas pode ser preenchido com o histórico da conversa).
    ],
  });

  const result = await chat.sendMessage(prompt);  // Envia a mensagem (prompt) para o modelo e aguarda a resposta.
  const response = result.response;  // Obtém a resposta gerada pelo modelo.
  console.log(response.text());  // Exibe a resposta no console.
  return response.text();  // Retorna o texto da resposta.
}

export default runChat;  // Exporta a função 'runChat' para ser utilizada em outros arquivos.