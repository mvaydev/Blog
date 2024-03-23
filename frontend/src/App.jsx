import './App.css'
import { useContext } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './main'

import Login from './pages/Login'
import Registration from './pages/Registration'
import Main from './pages/Main'
import Verify from './pages/Verify'
import Profile from './pages/Profile'
import ProfileWithId from './pages/ProfileWithId'

export default observer(() => {
	const { userStore } = useContext(Context);

	if(userStore.isAuth === 'false') {
		return (
			<BrowserRouter>
				<Routes>
					<Route index element={
						<Navigate to='/login' replace />
					}>
					</Route>

					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/verify' element={<Verify />} />
				</Routes>
			</BrowserRouter>
		)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />}></Route>
				<Route path='/profile' element={<Profile />}></Route>
				<Route path='/profile/:id' element={<ProfileWithId />}></Route>
				<Route path='*' element={<Navigate to='/'></Navigate>}></Route>
			</Routes>
		</BrowserRouter>
	)
})
