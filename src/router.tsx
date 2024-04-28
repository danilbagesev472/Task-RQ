import { createBrowserRouter } from 'react-router-dom'
import { Edit } from './page/Edit'
import Home from './page/Home'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Home,
	},
	{
		path: `/:id`,
		Component: Edit,
	},
])
