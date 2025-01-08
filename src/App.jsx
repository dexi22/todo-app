import Title from './components/title';
import TaskList from './components/taskList';
import useTasks from './hooks/useTasks';

export default function () {
	const { tasks, createTask, removeTask, renameTask } = useTasks();

	return (
		<div className="bg-background text-text-primary min-h-screen px-4 py-8 font-[poppins] tracking-wider selection:bg-purple-600 selection:text-white">
			<div className="max-w-4xl mx-auto">
				<Title count={tasks.length} />
				<div className="m-4">
					<TaskList
						tasks={tasks}
						createTask={createTask}
						removeTask={removeTask}
						renameTask={renameTask}
					/>
				</div>
			</div>
		</div>
	);
}
