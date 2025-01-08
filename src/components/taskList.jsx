import { useCallback, useEffect, useState } from 'react';
import Task from './task.jsx';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation.jsx';
import useTaskRefs from '../hooks/useTasksRefs.jsx';
import useCreateTaskHotkey from '../hooks/useCreateTaskHotkey.jsx';
import useTaskHotkeys from '../hooks/useTaskHotkeys.jsx';

export default function ({ tasks, createTask, removeTask, renameTask }) {
	const [editMode, setEditMode] = useState(false);
	const [isCreatingTask, setIsCreatingTask] = useState(false);

	const { itemRefs, creatingTaskRef, focusTask } = useTaskRefs(tasks);

	const { currentIndex, setCurrentIndex } = useKeyboardNavigation({
		itemsLength: tasks.length,
		editMode,
		onFocusItem: (index) => {
			setCurrentIndex(index);
			focusTask(index);
		},
	});

	useCreateTaskHotkey({
		editMode,
		setEditMode,
		setIsCreatingTask,
		creatingTaskRef,
	});

	const handleTaskHotkeys = useTaskHotkeys({
		editMode,
		isCreatingTask,
		currentIndex,
		tasksLength: tasks.length,
		focusTask,
		setEditMode,
		setIsCreatingTask,
		setCurrentIndex,
		createTask,
		renameTask,
		removeTask,
		itemRefs,
		creatingTaskRef,
	});

	const handleFocus = useCallback(
		(e) => {
			if (e.target.tabIndex >= 0 && !isCreatingTask) {
				setCurrentIndex(e.target.tabIndex);
			}
		},
		[isCreatingTask, setCurrentIndex]
	);

	return (
		<ul
			className="flex flex-col gap-3 my-6"
			onFocus={handleFocus}
			onKeyDown={handleTaskHotkeys}
		>
			{tasks.map((task, index) => {
				return (
					<Task
						key={index}
						ref={(el) => (itemRefs.current[index] = el)}
						tabIndex={index}
						name={task.name}
						editMode={editMode && index === currentIndex}
					/>
				);
			})}
			{isCreatingTask && (
				<Task
					ref={(el) => (creatingTaskRef.current = el)}
					editMode={editMode}
					tabIndex={tasks.length}
				/>
			)}
		</ul>
	);
}
