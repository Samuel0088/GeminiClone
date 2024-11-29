import { createContext, useState } from "react";  // Importa funções necessárias para criar o contexto e gerenciar o estado no React.
import runChat from "../config/gemini";  // Importa a função 'runChat' que interage com o modelo de AI Gemini para obter respostas.

export const Context = createContext();  // Cria o contexto que será usado para compartilhar o estado entre componentes.

const ContextProvider = (props) => {  // O provider que gerencia o estado global da aplicação.

    // Declaração de variáveis de estado usando o hook useState
    const [input, setInput] = useState("");  // O estado que guarda o texto digitado pelo usuário.
    const [recentPrompt, setRecentPrompt] = useState("");  // O estado que armazena o último prompt enviado ao modelo.
    const [prevPrompts, setPrevPrompts] = useState([]);  // O estado que guarda o histórico de prompts enviados.
    const [showResult, setShowResult] = useState(false);  // O estado que controla a visibilidade do resultado.
    const [loading, setLoading] = useState(false);  // O estado que indica se a resposta está sendo carregada.
    const [resultData, setResultData] = useState("");  // O estado que guarda os dados da resposta gerada pelo modelo.

    // Função para simular o atraso de digitação ao exibir a resposta, caractere por caractere.
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);  // Atualiza o estado 'resultData' adicionando a palavra uma por uma.
        }, 75 * index);  // O tempo de delay aumenta conforme o índice para simular uma digitação lenta.
    }

    // Função para resetar o chat, limpar o histórico e estado de carregamento.
    const newChat = () => {
        setLoading(false);  // Limpa o estado de carregamento.
        setShowResult(false);  // Oculta os resultados.
    }

    // Função chamada quando o prompt é enviado, interage com o modelo de AI para obter uma resposta.
    const onSent = async (prompt) => {
        
        setResultData("");  // Reseta a resposta antes de enviar uma nova.
        setLoading(true);  // Indica que o carregamento começou.
        setShowResult(true);  // Exibe a área de resultado.

        let response;  // Variável para armazenar a resposta gerada pelo modelo.
        
        if (prompt !== undefined) {  // Se um prompt for passado como argumento:
            response = await runChat(prompt);  // Chama a função 'runChat' para obter a resposta do modelo de AI.
            setRecentPrompt(prompt);  // Armazena o prompt enviado como o último prompt.
        } else {  // Se não for fornecido um prompt, usa o estado 'input':
            setPrevPrompts(prev => [...prev, input]);  // Adiciona o 'input' ao histórico de prompts.
            setRecentPrompt(input);  // Armazena o 'input' como o prompt recente.
            response = await runChat(input);  // Chama a função 'runChat' para obter a resposta do modelo de AI.
        }
       
        // Formata a resposta, destacando as partes entre ** em negrito.
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];  // Adiciona a parte normal da resposta.
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";  // Coloca em negrito as partes delimitadas por **.
            }
        }

        // Substitui "*" por tags <br> para adicionar quebras de linha.
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");  // Divide a resposta formatada em palavras.

        // Para cada palavra da resposta, chama a função 'delayPara' para exibir a resposta com um pequeno atraso.
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];  // Palavra atual da resposta.
            delayPara(i, nextWord + " ");  // Chama a função para exibir a palavra com atraso.
        }

        setLoading(false);  // Finaliza o carregamento após a resposta ser exibida.
        setInput("");  // Limpa o campo de entrada após o envio.
    }

    // O objeto contextValue contém todos os estados e funções que serão compartilhados com os componentes filhos.
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>  // Provedor do contexto, que torna os valores acessíveis aos componentes filhos.
            {props.children}  // Renderiza os componentes filhos do provider.
        </Context.Provider>
    )
}

export default ContextProvider;  // Exporta o provider para ser utilizado na aplicação.