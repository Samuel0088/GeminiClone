import React, { useContext } from 'react';  // Importa o React e o hook useContext para acessar o contexto.
import './main.css'  // Importa o arquivo de estilo CSS para a página principal.
import { assets } from '../../assets/assets'  // Importa os ícones e outros assets de uma pasta de recursos.
import { Context } from '../../context/context';  // Importa o contexto global da aplicação, fornecido pela Context API.

const main = () => {  // Declara o componente funcional 'main'.
  
  // Desestruturação das propriedades fornecidas pelo Contexto.
  const { 
    onSent, 
    recentPrompt, 
    showResult, 
    loading, 
    resultData, 
    setInput, 
    input 
  } = useContext(Context);  // Usa o useContext para acessar o estado global armazenado no Context.

  return (
    <div className='main'>  {/* Container principal da página */}
      <div className='nav'>  {/* Navbar no topo */}
        <p>Gemini</p>  {/* Nome do aplicativo */}
        <img src={assets.user_icon} alt="" />  {/* Exibe o ícone do usuário */}
      </div>
      <div className='main-container'>  {/* Container principal para o conteúdo da página */}
        
        {!showResult  // Se showResult for falso, exibe as opções de interação.
          ? <>
            <div className='greet'>  {/* Saudação */}
              <p><span>Olá, Dev.</span></p>  {/* Saudação personalizada */}
              <p>Em que posso ajudar você?</p>  {/* Pergunta ao usuário */}
            </div>
            <div className='cards'>  {/* Exibe uma série de cartões com sugestões */}
              <div className="card">
                <p>Sugira um lugar bonito para ver em uma próxima viagem</p>
                <img src={assets.compass_icon} alt="" />  {/* Ícone do cartão */}
              </div>
              <div className="card">
                <p>Resuma brevemente este conceito: planejamento urbano</p>
                <img src={assets.bulb_icon} alt="" />  {/* Ícone do cartão */}
              </div>
              <div className="card">
                <p>Brainstorming de atividades de integração da equipe para nosso retiro de trabalho</p>
                <img src={assets.message_icon} alt="" />  {/* Ícone do cartão */}
              </div>
              <div className="card">
                <p>Melhore a legibilidade do seguinte</p>
                <img src={assets.code_icon} alt="" />  {/* Ícone do cartão */}
              </div>
            </div>
          </>  
          : <div className='result'>  {/* Se showResult for verdadeiro, exibe o resultado da consulta */}
              <div className="result-title">
                <img src={assets.user_icon} alt='' />  {/* Exibe o ícone do usuário */}
                <p>{recentPrompt}</p>  {/* Exibe o prompt que foi enviado */}
              </div>
              <div className="result-data">  {/* Exibe os dados do resultado */}
                <img src={assets.gemini_icon} alt="" />  {/* Ícone do Gemini */}
                {loading  // Se o resultado estiver carregando, exibe um indicador de carregamento.
                ? <div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                  </div>
                : <p dangerouslySetInnerHTML={{__html: resultData}}></p>  /* Exibe o resultado, permitindo HTML */
                }
              </div>
          </div>
        }

        <div className="main-bottom">  {/* Parte inferior da página com a caixa de pesquisa */}
          <div className="search-box">  {/* Caixa de entrada para o usuário digitar perguntas */}
            <input 
              onChange={(e) => setInput(e.target.value)}  // Atualiza o estado 'input' quando o valor da entrada muda
              value={input}  // Valor da entrada vinculado ao estado 'input'
              type="text" 
              placeholder='Pergunte ao Gemini' 
            />
            <div>
              <img src={assets.gallery_icon} alt="" />  {/* Ícone de galeria */}
              <img src={assets.mic_icon} alt="" />  {/* Ícone de microfone */}
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}  {/* Se houver entrada, exibe o ícone de enviar */}
            </div>
          </div>
          <p className="bottom-info">  {/* Informação sobre privacidade do Gemini */}
            O Gemini pode exibir informações imprecisas, inclusive sobre pessoas, portanto, verifique novamente suas respostas aos aplicativos de privacidade.
          </p>
        </div>
      </div>
    </div>
  )
}

export default main  // Exporta o componente para ser usado em outras partes da aplicação.
