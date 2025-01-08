import { useEffect, useState } from 'react';

const KEYBOARD_MAPS = {
	ArrowDown: 1,
	j: 1,
	ArrowUp: -1,
	k: -1,
};

const getNextIndex = (current, increment, max) => {
	const next = current + increment;
	if (next < 0) return max;
	if (next > max) return 0;
	return next;
};

export default function useKeyboardNavigation({
	itemsLength,
	editMode,
	onFocusItem,
}) {
	const [currentIndex, setCurrentIndex] = useState(-1);

	useEffect(() => {
		function handleHomeEndPress(e) {
			if (e.key === 'Home' || e.key === 'u') {
				e.preventDefault();
				onFocusItem(0);
				return true;
			}
			if (e.key === 'End' || e.key === 'i') {
				e.preventDefault();
				onFocusItem(itemsLength - 1);
				return true;
			}
			return false;
		}

		function handleArrowsPress(e) {
			const increment = KEYBOARD_MAPS[e.key];
			if (!increment) return false;

			e.preventDefault();

			const nextIndex = getNextIndex(currentIndex, increment, itemsLength - 1);
			onFocusItem(nextIndex);

			return true;
		}

		function handleNumberPress(e) {
			const index = parseInt(e.key) - 1;
			if (isNaN(index) || index >= itemsLength) return false;

			onFocusItem(index);
			return true;
		}

		function handleKeyPress(e) {
			if (editMode) return;

			if (handleHomeEndPress(e)) return;
			if (handleArrowsPress(e)) return;
			if (handleNumberPress(e)) return;
		}

		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [itemsLength, editMode, onFocusItem]);

	return { currentIndex, setCurrentIndex };
}
