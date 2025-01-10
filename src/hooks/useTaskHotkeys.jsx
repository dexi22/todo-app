import { useCallback } from 'react';

export default function useTaskHotkeys({
	editMode,
	isCreatingTask,
	currentIndex,
	tasksLength,
	focusTask,
	setEditMode,
	setIsCreatingTask,
	setCurrentIndex,
	createTask,
	renameTask,
	removeTask,
	itemRefs,
	creatingTaskRef,
}) {
	return useCallback(
		(e) => {
			if (e.ctrlKey || e.altKey || e.metaKey) return;

			if (e.key === 'Enter' && editMode) {
				e.preventDefault();

				if (isCreatingTask) {
					const taskName = creatingTaskRef.current.value;
					createTask(taskName);
					setIsCreatingTask(false);
					setTimeout(() => focusTask(tasksLength));
				} else {
					const taskName = itemRefs.current[currentIndex].value;
					renameTask(taskName, currentIndex);
					setTimeout(() => focusTask(currentIndex));
				}

				setEditMode(false);
				return;
			}

			if (e.key === 'Escape' && editMode) {
				e.preventDefault();
				if (isCreatingTask) {
					setIsCreatingTask(false);
				}
				setEditMode(false);
				setTimeout(() => focusTask(currentIndex));
				return;
			}

			if (editMode) return;

			if (e.key === 'd') {
				e.preventDefault();
				removeTask(currentIndex);

				if (currentIndex >= tasksLength - 1) {
					const newIndex = tasksLength - 2;
					setCurrentIndex(newIndex);
					focusTask(newIndex);
				}

				return;
			}

			if (e.key === 'e') {
				e.preventDefault();
				setEditMode(true);
				setTimeout(() => focusTask(currentIndex));
				return;
			}
		},
		[
			editMode,
			isCreatingTask,
			currentIndex,
			tasksLength,
			focusTask,
			setEditMode,
			setIsCreatingTask,
			setCurrentIndex,
			createTask,
			renameTask,
			removeTask,
			itemRefs,
			creatingTaskRef,
		]
	);
}
