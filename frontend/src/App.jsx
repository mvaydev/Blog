import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './main'

import Navbar from './components/Navbar'
import Login from './pages/Login/Login'
import Registration from './pages/Login/Registration'
import Main from './pages/Main'
import Profile from './pages/Profile/Profile'
import ProfileWithId from './pages/Profile/ProfileWithId'
import Settings from './pages/Profile/Settings'
import Write from './pages/Write'
import PostPage from './pages/PostPage'

export default observer(() => {
	const { userStore } = useContext(Context)
	const [userId, setUserId] = useState(null)

	useEffect(() => {
		if(userStore.isAuth) {
			userStore.getId().then(res => setUserId(res))
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
				<Route path='/profile/:id' element={<ProfileWithId />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</BrowserRouter>
	)
})
