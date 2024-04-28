import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TTask } from '../types/type'

export function Task({ id, title }: TTask) {
	const delT = useMutation({
		mutationFn: async (id: any) =>
			await axios.delete(
				`https://65f668a941d90c1c5e0ac7e2.mockapi.io/users/${id}`
			),
	})
	return (
		<>
			<div key={id} className='flex gap-3 mb-2'>
				{title}
				<div className='flex gap-2'>
					<Link to={`/${id}`}>Edit</Link>
					<button onClick={() => delT.mutate(id)}>Del</button>
				</div>
			</div>
		</>
	)
}
