import App from './App'
import './index.css'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import UserStore from './store/userStore'

export const userStore = new UserStore()
export const Context = createContext({userStore})

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Context.Provider value={{
			userStore
		}}>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
