export default function ({ name, editMode, tabIndex, ref, onSubmit }) {
	const sharedClasses =
		'bg-primary focus:outline outline-[#9a68ea] w-full text-left rounded-full p-3 focus:-translate-x-1 transition-all hover:bg-[#291a5c] focus:bg-[#291a5c]';

	return (
		<li className="rounded-xl">
			{editMode ? (
				<input
					className={sharedClasses}
					tabIndex={tabIndex}
					ref={ref}
					defaultValue={name}
				/>
			) : (
				<button className={sharedClasses} tabIndex={tabIndex} ref={ref}>
					{name}
				</button>
			)}
		</li>
	);
}
