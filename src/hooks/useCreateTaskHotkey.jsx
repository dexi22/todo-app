import { useEffect } from 'react';

export default function useCreateTaskHotkey({
	editMode,
	setEditMode,
	setIsCreatingTask,
	creatingTaskRef,
}) {
	useEffect(() => {
		const handleCreateTaskHotkey = (e) => {
			if (editMode || e.key !== 'n') return;
			if (e.ctrlKey || e.altKey || e.metaKey) return;
			e.preventDefault();
			setIsCreatingTask(true);
			setEditMode(true);
			setTimeout(() => creatingTaskRef.current?.focus());
		};

		document.addEventListener('keydown', handleCreateTaskHotkey);
		return () => {
			document.removeEventListener('keydown', handleCreateTaskHotkey);
		};
	}, [editMode, setEditMode, setIsCreatingTask, creatingTaskRef]);
}
