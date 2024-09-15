import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import useSWR from 'swr'
import LoginPage from './Login'
import HomePage from './Home'

function App() {

    const [pass_fail, set_pass_fail] = useState(false)

    useEffect(() => {
        localStorage.getItem('token') ? set_pass_fail(true) : set_pass_fail(false)
    })

    return (
        <>
            <div className='container'>
                {pass_fail ?
                    <HomePage />
                    : <LoginPage />}
            </div>
        </>
    )
}

export default App
