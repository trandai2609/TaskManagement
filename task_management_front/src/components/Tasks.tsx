import React, { useState, useEffect } from 'react';
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { Task } from '../types/models';

const Tasks: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    updateTask,
    createTask,
    deleteTask,
  } = useTasks();
  const { user } = useAuth();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showNewTask, setShowNewTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user && user.id) {
      fetchTasks({ user_id: user.id });
    }
  }, [user]);

  const handleEditTask = (task: Task) => setEditingTask(task);
  const handleNewTask = () => setShowNewTask(true);
  const handleCloseForm = () => {
    setEditingTask(null);
    setShowNewTask(false);
  };
  const handleEditSubmit = async (data: Partial<Task>) => {
    if (editingTask && editingTask.id) {
      await updateTask(editingTask.id, data);
    }
    handleCloseForm();
    fetchTasks({ user_id: user?.id });
  };
  const handleCreateSubmit = async (data: Partial<Task>) => {
    if (user && user.id) {
      await createTask({ ...data, user_id: user.id });
    } else {
      await createTask(data);
    }
    handleCloseForm();
    fetchTasks({ user_id: user?.id });
  };
  const handleDeleteTask = (task: Task) => setDeletingTask(task);
  const handleConfirmDelete = async () => {
    if (deletingTask && deletingTask.id) {
      await deleteTask(deletingTask.id);
      setDeletingTask(null);
      fetchTasks({ user_id: user?.id });
    }
  };
  const handleCancelDelete = () => setDeletingTask(null);

  return (
    <div className='tasks-container container py-5 bg-light rounded'>
      <h2 className='tasks-title text-center text-dark mb-4'>Tasks Management</h2>
      {error && <div className='alert alert-danger mb-2'>{error}</div>}
      {editingTask && (
        <div
          className='modal fade show d-block'
          tabIndex={-1}
          role='dialog'
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={handleCloseForm}
                ></button>
              </div>
              <div className='modal-body'>
                <TaskForm initial={editingTask} onSubmit={handleEditSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dialog for new task */}
      {showNewTask && (
        <div
          className='modal fade show d-block'
          tabIndex={-1}
          role='dialog'
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={handleCloseForm}
                ></button>
              </div>
              <div className='modal-body'>
                <TaskForm onSubmit={handleCreateSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dialog for delete confirmation */}
      {deletingTask && (
        <div
          className='modal fade show d-block'
          tabIndex={-1}
          role='dialog'
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Delete Task</h5>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className='modal-body'>
                <p>
                  Are you sure you want to delete the task{' '}
                  <b>{deletingTask.title}</b>?
                </p>
                <div className='d-flex justify-content-end gap-2'>
                  <button
                    className='btn btn-secondary'
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={handleConfirmDelete}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <TaskList
        tasks={tasks}
        onSearch={(q) => fetchTasks({ search: q, user_id: user?.id })}
        onFilter={(params) => fetchTasks({ ...params, user_id: user?.id })}
        onEditTask={handleEditTask}
        onNewTask={handleNewTask}
        onDeleteTask={handleDeleteTask}
      />
      {loading && <div className='text-muted mt-2'>Loading...</div>}
    </div>
  );
};

export default Tasks;
