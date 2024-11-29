import React, { useContext, useState } from 'react'  // Importa o React, useContext e useState.
import './Sidebar.css'  // Importa o arquivo de estilos CSS para o Sidebar.
import { assets } from '../../assets/assets'  // Importa os ícones e outros recursos da pasta de assets.
import { Context } from '../../context/Context'  // Importa o contexto da aplicação, que fornece estados e funções compartilhadas.

const Sidebar = () => {  // Define o componente Sidebar.

    const [extended, setExtended] = useState(false)  // Cria o estado 'extended' que controla se o sidebar está expandido ou não.
    const { anSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)  // Acessa o contexto global para obter funções e dados.

    // Função que carrega um prompt anterior ao ser clicado, define o prompt recente e chama a função onSent.
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)  // Define o prompt recente no estado global.
        await onSent(prompt)  // Chama a função onSent para enviar o prompt carregado.
    }

    return (
        <div className='sidebar'>  {/* Container principal do Sidebar */}
            <div className="top">  {/* Parte superior do Sidebar */}
                <img 
                    onClick={() => setExtended(prev => !prev)}  // Ao clicar, alterna entre expandir ou recolher o Sidebar.
                    className='menu' 
                    src={assets.menu_icon} 
                    alt="" 
                />
                <div 
                    onClick={() => newChat()}  // Ao clicar, chama a função newChat para iniciar um novo chat.
                    className="new-chat"
                >
                    <img src={assets.plus_icon} alt="" />  {/* Ícone de adicionar chat */}
                    {extended ? <p>New Chat</p> : null}  {/* Exibe o texto "New Chat" se o Sidebar estiver expandido. */}
                </div>
                {extended  // Se o Sidebar estiver expandido, exibe os prompts recentes.
                    ? <div className="recent">
                        <p className="recent-title">Recent</p>  {/* Título para a seção de prompts recentes */}
                        {prevPrompts.map((item, index) => {  // Mapeia e exibe cada prompt recente.
                            return(
                                <div 
                                    key={index}  // Adiciona a chave para cada item na lista de prompts.
                                    onClick={() => loadPrompt(item)}  // Ao clicar no prompt, carrega o prompt clicado.
                                    className="recent-entry"
                                >
                                    <img src={assets.message_icon} alt="" />  {/* Ícone de mensagem */}
                                    <p>{item.slice(0,18)} ...</p>  {/* Exibe os primeiros 18 caracteres do prompt, seguido de "..." */}
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>
            <div className="bottom">  {/* Parte inferior do Sidebar com itens adicionais */}
                <div className="bottom-item recent-entry">  {/* Item de "Help" */}
                    <img src={assets.question_icon} alt="" />  {/* Ícone de ajuda */}
                    {extended ? <p>Help</p> : null}  {/* Exibe "Help" se o Sidebar estiver expandido. */}
                </div>
                <div className="bottom-item recent-entry">  {/* Item de "Activity" */}
                    <img src={assets.history_icon} alt="" />  {/* Ícone de histórico */}
                    {extended ? <p>Activity</p> : null}  {/* Exibe "Activity" se o Sidebar estiver expandido. */}
                </div>
                <div className="bottom-item recent-entry">  {/* Item de "Settings" */}
                    <img src={assets.setting_icon} alt="" />  {/* Ícone de configurações */}
                    {extended ? <p>Settings</p> : null}  {/* Exibe "Settings" se o Sidebar estiver expandido. */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar  // Exporta o componente Sidebar para ser utilizado em outras partes da aplicação.