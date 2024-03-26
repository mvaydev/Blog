import App from './App'
import './index.css'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import UserStore from './store/userStore'
import PostStore from './store/postStore'

export const userStore = new UserStore()
export const postStore = new PostStore()
export const Context = createContext({userStore, postStore})

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Context.Provider value={{
			userStore,
			postStore
		}}>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
