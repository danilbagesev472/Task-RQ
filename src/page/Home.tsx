import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Task } from '../components/task'
import { TTask } from '../types/type'
import './Home.css'

function Home() {
	const navigate = useNavigate()
	const [inputValue, setInputValue] = useState('')
	const { data } = useQuery({
		queryKey: ['home'],
		queryFn: async () => {
			const tasks = await axios.get<TTask[]>(
				'https://65f668a941d90c1c5e0ac7e2.mockapi.io/users'
			)
			return tasks.data
		},
	})
	const addNew = useMutation({
		mutationFn: async (e: any) => {
			e.preventDefault()
			await axios.post('https://65f668a941d90c1c5e0ac7e2.mockapi.io/users', {
				title: inputValue,
			})
			setInputValue('')
			navigate('/')
		},
	})

	return (
		<>
			<h3>Add Task</h3>
			<form onSubmit={addNew.mutate} className=' mb-7'>
				<textarea
					placeholder='New task'
					cols={30}
					rows={2}
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
				></textarea>
				<br />
				<button type='submit'>Add</button>
				<hr />
			</form>
			{data?.map(task => (
				<Task key={task.id} id={task.id} title={task.title} />
			))}
		</>
	)
}

export default Home
