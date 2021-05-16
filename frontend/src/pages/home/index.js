import React, {useState} from 'react'
import Seta from '../../assets/seta.svg'
import './styles.css'
import Routes from './routes'
import {Link} from 'react-router-dom'

export default function Home() {

    

    return (
        <div className='container-home' >
            <aside className='navigation-container'>
                <Link to='/'>
                    <p className='logo'>StocksPlace</p>
                </Link>
                <nav>
                    <p className='title-nav'>Suas ações</p>

                    <ul>
                    <Link to='/stock/VALE3.SA' >
                        <li className='item-nav'>VALE3.SA <img src={Seta} alt="seta" /></li>
                    </Link>
                        
                        <li className='item-nav'>IBM <img src={Seta} alt="seta" /></li>
                        <li className='item-nav'>FBOK34.SAO <img src={Seta} alt="seta" /></li>
                    </ul>
                </nav>
            </aside>
            <div className='content'>
                <Routes />
            </div>
               
        </div>
    )
}
