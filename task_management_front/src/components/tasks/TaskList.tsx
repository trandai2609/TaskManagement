import React, { useState } from 'react';
import { Task } from '../../types/models';

interface TaskListProps {
  tasks: Task[];
  onSearch: (query: string) => void;
  onFilter: (filter: { status?: string; priority_id?: number }) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  onNewTask?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onSearch,
  onFilter,
  onEditTask,
  onDeleteTask,
  onNewTask,
}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className='p-4 w-100 max-w-3xl mx-auto'>
      <form className='row g-2 mb-4 align-items-center' onSubmit={handleSearch}>
        <div className='col-md'>
          <input
            className='form-control'
            type='text'
            placeholder='Search tasks...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='col-md-auto'>
          <select
            className='form-select'
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              onFilter({ status: e.target.value });
            }}
          >
            <option value=''>All Status</option>
            <option value='Incomplete'>Incomplete</option>
            <option value='Complete'>Complete</option>
          </select>
        </div>
        <div className='col-md-auto'>
          <select
            className='form-select'
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              onFilter({ priority_id: Number(e.target.value) });
            }}
          >
            <option value=''>All Priorities</option>
            <option value='1'>Low</option>
            <option value='2'>Medium</option>
            <option value='3'>High</option>
          </select>
        </div>
        <div className='col-md-auto'>
          <button className='btn btn-primary' type='submit'>
            Search
          </button>
        </div>
      </form>
      <div className='mb-3 text-start'>
        <button className='btn btn-success' type='button' onClick={onNewTask}>
          + New Task
        </button>
      </div>
      <ul className='list-group bg-white rounded shadow'>
        {tasks.map((task) => (
          <li
            key={task.id}
            className='list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between'
          >
            <div>
              <div className='fw-semibold'>{task.title}</div>
              <div className='text-muted small'>
                Due:{' '}
                {task.due_date
                  ? task.due_date.length > 10
                    ? new Date(task.due_date).toISOString().slice(0, 10)
                    : task.due_date
                  : 'N/A'}{' '}
                | Priority: {task.priority_id}
              </div>
            </div>
            <div className='mt-2 mt-md-0 d-flex align-items-center gap-2'>
              <span
                className={`badge px-3 py-2 rounded-pill ${
                  task.status === 'Complete'
                    ? 'bg-success text-white'
                    : 'bg-warning text-dark'
                }`}
              >
                {task.status}
              </span>
              <button
                className='btn btn-outline-primary btn-sm ms-2'
                onClick={() => onEditTask && onEditTask(task)}
                title='Edit Task'
              >
                Edit
              </button>
              <button
                className='btn btn-outline-danger btn-sm ms-2'
                onClick={() => onDeleteTask && onDeleteTask(task)}
                title='Delete Task'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
