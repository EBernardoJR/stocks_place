import React, {useEffect, useState} from 'react';

import api from '../../../services/api'
// import { Container } from './styles';

function Stock({match}) {

    

  const [to, setTo] = useState('')
    
  const [history, setHistory] = useState([])
  const [valueInputStock, setValueInputStock] = useState('')
  const [stocks, setStocks] = useState([])
  const [stocksCompare, setStocksCompare] = useState([])
  const [from, setfrom] = useState('')
  const [stockName, setStockName] = useState('stock')

  async function getHistory(){
    console.log('from ' + from + 'to ' + to)
    await api.get(`/stocks/${stockName}/history`, {
      params: {
        from,
        to
      }
    }).then(res => {
      setHistory(res.data.prices)
    }).catch(e => {
        console.log(e.response)
    })
}
  async function getStocks(){
    await api.post(`/stocks/${stockName}/compare`, {
      stocks
    }).then(res => {
      console.log(res.data)
      setStocksCompare(res.data.lastPrices)
    }).catch(e => {
        console.log(e.response)
    })
  }
  useEffect(() => {
    setStockName(match.params.stock_name)
  }, [])
  return (
      <div className='stock-container'>
          <p className='stock-title'>{stockName}</p>
          <div className="history">
            <p>Consultar rendimentos</p>
            <p>
              de

              <input type="date" name="date" id="" value={from} onChange={e => {
              setfrom(e.target.value)
            }}/>

            ate
            <input type="date" name="date" id="" value={to} onChange={e => {
              setTo(e.target.value)
            }}/>
            </p>
            <button type='submit' onClick={getHistory}>Consultar</button>
            <div className="history-data">
           {
             history.length>0? 
             history.map(prices => (
            <p>
              {prices.pricedAt}
            <ul>
              <li>Abertura: <strong>{parseFloat(prices.openning).toFixed(2)}</strong></li>
              <li>Alta: <strong>{parseFloat(prices.high).toFixed(2)}</strong></li>
              <li>Baixa: <strong>{parseFloat(prices.low).toFixed(2)}</strong></li>
              <li>Fechamento: <strong>{parseFloat(prices.closing).toFixed(2)}</strong></li>
            </ul>
            </p>
             ))
             :
             false
           }
            
            </div>
            
          </div>
            <div className="compare">
              <p>Comparar com outras ações</p>
              <p className='add-stock'><input type="text" placeholder='Nome da ação' value={valueInputStock} onChange={e => {
                setValueInputStock(e.target.value)
              }}/><button onClick={() => {
                setStocks([...stocks, valueInputStock])
                setValueInputStock('')
              }}>Adicionar</button></p>
              <div className="stocks-container">
                <ul>
                  {
                    stocks.length>0? stocks.map(stock => (
                      <li>{stock}</li>
                    )):false
                  }
                  
                </ul>
                <button type='submit' className='submit' onClick={getStocks}>Comparar</button>
              </div>
              <div className="stocks-results">
                {
                  stocksCompare.length>1? stocksCompare.map(stock => (
                    <p>
                    <strong>{stock.name}</strong>
                     <ul>
                       <li>
                         Preço: <strong>{parseFloat(stock.lastPrice).toFixed(2)}</strong>  
                       </li>
                       <li>
                         Data: <strong>{stock.priceAt}</strong>
                       </li>
                     </ul>
                   </p>
                  )):false
                }
              
               
              </div>
            </div>
      </div>
  );
}

export default Stock;