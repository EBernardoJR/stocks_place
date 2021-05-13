import React, {useState} from 'react'
import './styles.css'


export default function Login() {

    const [selected, setSelected] = useState('login')


    return (
        <div className='container'>
            <div className='form'>
                <nav className='navigation-bar'>
                    <ul>
                        <li className={selected === 'login'? 'selected': ''} onClick={() => setSelected('login')}>Entrar</li>
                        <li className={selected === 'register'? 'selected': ''} onClick={() => setSelected('register')}>Registrar-se</li>
                    </ul>
                </nav>
                {
                    selected === 'login'?
                    <div className='form-data'>
                        <input type="email" placeholder='E-mail'/>
                        <input type="password" placeholder='Senha'/>
                    <button type='submit'>Entrar</button>
                    </div>
                    :
                    <div className='form-data'>
                        <input type="email" placeholder='E-mail'/>
                        <input type="password" placeholder='Senha'/>
                        <input type="password" placeholder='Confirmar senha'/>
                        <button type='submit'>Registrar-se</button>
                    </div>
                }
            </div>
        </div>
    )
}
