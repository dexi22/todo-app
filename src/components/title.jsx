export default function ({ count }) {
	return (
		<h1 className="text-3xl bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
			{count || 'No'} tasks due today
		</h1>
	);
}
