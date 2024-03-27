import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './main'
import { fetchAuthUser } from './api/userApi'

import Login from './pages/Login'
import Registration from './pages/Registration'
import Main from './pages/Main'
import Profile from './pages/Profile'
import ProfileWithId from './pages/ProfileWithId'
import Settings from './pages/Settings'
import ChangePassword from './pages/ChangePassword'

export default observer(() => {
	const { userStore } = useContext(Context)
	const [user, setUser] = useState(null)

	useEffect(() => {
		if(userStore.isAuth) {
			fetchAuthUser().then(user => setUser(user))
		}
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				{
					userStore.isAuth ? (
						<>
							<Route path='/profile' element={<Profile />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/change-password' element={<ChangePassword />} />
							{
								user && <Route 
									path={'/profile/' + user.id} 
									element={<Navigate to='/profile' replace />}
								/>
							}
						</>
					) : (
						<>
							<Route path='/login' element={<Login />} />
							<Route path='/registration' element={<Registration />} />
						</>
					)
				}

				<Route path='/' element={<Main />} />
				<Route path='/profile/:id' element={<ProfileWithId />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	)
})
