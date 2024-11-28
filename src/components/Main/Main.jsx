import React, { useContext } from 'react';
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

const main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className='main-container'>

        {!showResult
          ? <>
            <div className='greet'>
              <p><span>Olá, Dev.</span></p>
              <p>Em que posso ajudar você?</p>
            </div>
            <div className='cards'>
              <div className="card">
                <p>Sugira um lugar bonito para ver em uma próxima viagem</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Resuma brevemente este conceito: planejamento urbano</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorming de atividades de integração da equipe para nosso retiro de trabalho</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Melhore a legibilidade do seguinte</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>  
          :<div className='result'>
              <div className="result-title">
                <img src={assets.user_icon} alt='' />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ?<div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }

              </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Pergunte ao Gemini' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            O Gemini pode exibir informações imprecisas, inclusive sobre pessoas, portanto, verifique novamente suas respostas aos aplicativos de privacidade.
          </p>
        </div>
      </div>
    </div>
  )



}
export default main


