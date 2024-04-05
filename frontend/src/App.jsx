import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './main'

import Navbar from './components/Navbar'
import Login from './pages/Login/Login'
import Registration from './pages/Login/Registration'
import Main from './pages/Main'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Profile/Settings'
import Write from './pages/Write/Write'
import PostPage from './pages/PostPage'
import { fetchAuthUser } from './api/userApi'

export default observer(() => {
	const { userStore } = useContext(Context)
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		if(userStore.isAuth) {
			fetchAuthUser().then(res => setUserId(res.id))
		}
	}, [])

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				{
					userStore.isAuth ? (
						<>
							<Route path='/profile' element={<Profile />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/write' element={<Write />} />
							<Route path='/edit/:id' element={<Write />} />
							{
								userId && <Route
									path={'/profile/' + userId}
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
				<Route path='/post/:id' element={<PostPage />} />
				<Route path='/profile/:id' element={<Profile />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	)
})
