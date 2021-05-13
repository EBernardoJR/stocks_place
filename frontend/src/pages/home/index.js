import React, {useState} from 'react'
import Icon from '../../assets/money.svg'
import Search from '../../assets/search.svg'
import './styles.css'
import axios from 'axios'
import api from '../../services/api'

export default function Home() {

    const [stocks, setStocks] = useState([])
    const [stock, setStock] = useState(false)
    const [value, setValue] = useState(1)

    function getStocks(query){
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=5XRW8LUSCPCIB6T7`)
            .then( res => {
                setStocks(res.data.bestMatches)
            })
    }

    async function getStock(stockName){
        await api.get(`/stocks/${stockName}/quote`).then(res => {
            setStock(res.data)
            setStocks([])
        }).catch(e => {
            console.log(e.response)
        })
    }

    return (
        <div className='container' onClick={() => setStocks([])}>
            <aside className='navigation-container'>
                <p className='logo'>StocksPlace</p>
                <nav>
                    <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                    </ul>
                </nav>
            </aside>
            <div className='content'>
                <div className='search-container'>
                    <input type="text" placeholder='Pesquisar ações' className='search-box' onChange={ e => {
                        if(e.target.value === undefined) return false
                        if(e.target.value.length <= 1) setStocks([])
                        if(e.target.value.length > 0) getStocks(e.target.value)
                    }}
                   
                    />
                    <img src={Search} alt="search"  width='30' height='30' className='icon-search'/>
                </div>
                {
                    stocks.length>0?  
                    <div className="search-content">
                        <ul>
                            {
                                stocks.map( stock => {
                                    return (
                                    <li onClick={() => getStock(stock['1. symbol'])}><p className='symbol'>{stock['1. symbol']}</p><p>{stock['2. name']}</p></li>
                                )})
                            }
                        </ul>
                    </div>
                :false
                }
                {
                    stock? 
                    <div className="stock">
                    <strong className='symbol'>{stock.name}</strong>
                    <p className='date'>Preço da ação em {stock.priceAt}: <strong>{parseFloat(stock.price).toFixed(2)}</strong></p>
                    <p>Comprar ações:</p>
                    <p className='buy'>
                        <input type="number" min='1' value={value} onChange={ e => setValue(e.target.value)}/>
                        <p>total: {(parseFloat(stock.price)*value).toFixed(2)}</p>
                    </p>
                    <button>Comprar</button>
                    </div>
                   
                   : false
                }
                </div>
               
        </div>
    )
}
