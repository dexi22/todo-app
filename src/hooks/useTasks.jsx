import { useCallback, useEffect, useState } from 'react';

export default function useTasks() {
	const [tasks, setTasks] = useState([]);

	// Load tasks on mount
	useEffect(() => {
		const storedTasks = localStorage.getItem('tasks');
		if (!storedTasks) return;

		setTasks(JSON.parse(storedTasks));
	}, []);

	// Save tasks whenever they change
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const createTask = useCallback((name) => {
		setTasks((prevTasks) => [...prevTasks, { name }]);
	}, []);

	const removeTask = useCallback((index) => {
		setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
	}, []);

	const renameTask = useCallback((newName, index) => {
		setTasks((prevTasks) =>
			prevTasks.map((task, i) => {
				return i === index ? { ...task, name: newName } : task;
			})
		);
	}, []);

	return {
		tasks,
		createTask,
		removeTask,
		renameTask,
	};
}
