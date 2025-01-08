import { useCallback, useRef, useEffect } from 'react';

export default function useTaskRefs(tasks) {
	const itemRefs = useRef([]);
	const creatingTaskRef = useRef(null);

	useEffect(() => {
		itemRefs.current = itemRefs.current.filter((ref) => ref !== null);
	}, [tasks]);

	const focusTask = useCallback((index) => {
		itemRefs.current[index]?.focus();
	}, []);

	return {
		itemRefs,
		creatingTaskRef,
		focusTask,
	};
}
