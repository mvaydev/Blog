import App from './App'
import './index.css'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import UserStore from './store/userStore'

export const userStore = new UserStore()
export const Context = createContext({userStore})

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Context.Provider value={{
			userStore
		}}>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
