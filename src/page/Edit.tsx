import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TTask } from '../types/type'

export function Edit() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [taskData, setTaskData] = useState<TTask>()

	const { data } = useQuery({
		queryKey: ['editT', id],
		queryFn: async () => {
			const res = await axios.get(
				`https://65f668a941d90c1c5e0ac7e2.mockapi.io/users/${id}`
			)
			return res.data
		},
	})
	const edit = useMutation({
		mutationFn: async (e: any) => {
			e.preventDefault()
			const res = await axios.put(
				`https://65f668a941d90c1c5e0ac7e2.mockapi.io/users/${id}`,
				{ title: taskData }
			)
			setTaskData(res.data.title)
			navigate('/')
		},
	})

	return (
		<>
			<Link to={'/'}>Back</Link>
			<div>
				<p>Real task [ {data?.title} ]</p>
				<h4>Edit your task, enter btn Save</h4>
				<textarea
					onChange={e => setTaskData(e.target.value)}
					className='p-4'
					cols={40}
					rows={5}
					value={taskData}
					placeholder='New text'
				></textarea>
			</div>
			<button onClick={edit.mutate}>Save</button>
		</>
	)
}
