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
import Settings from './pages/Settings'
import ChangePassword from './pages/ChangePassword'

export default observer(() => {
	const { userStore } = useContext(Context);

	return (
		<BrowserRouter>
			<Routes>
				{
					userStore.isAuth ? (
						<>
							<Route path='/profile' element={<Profile />}></Route>
							<Route path='/settings' element={<Settings />}></Route>
							<Route path='/change-password' element={<ChangePassword />}></Route>
						</>
					) : (
						<>
							<Route path='/login' element={<Login />}></Route>
							<Route path='/registration' element={<Registration />}></Route>
						</>
					)
				}

				<Route path='/' element={<Main />}></Route>
				<Route path='/verify' element={<Verify />}></Route>
				<Route path='/profile/:id' element={<ProfileWithId />}></Route>
				<Route path='*' element={<Navigate to='/'></Navigate>}></Route>
			</Routes>
		</BrowserRouter>
	)
})
