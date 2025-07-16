import React, { useState } from 'react';
import { Task } from '../../types/models';

interface TaskFormProps {
  initial?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => void;
  loading?: boolean;
  error?: string;
}

const priorities = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' },
];

const TaskForm: React.FC<TaskFormProps> = ({
  initial = {},
  onSubmit,
  loading,
  error,
}) => {
  // Helper to format ISO date string to yyyy-MM-dd for input type="date"
  function formatDateForInput(dateStr?: string) {
    if (!dateStr) return '';
    // Handles both 'YYYY-MM-DD' and ISO string
    return dateStr.length > 10 ? new Date(dateStr).toISOString().slice(0, 10) : dateStr;
  }

  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [dueDate, setDueDate] = useState(formatDateForInput(initial.due_date));
  const [priority, setPriority] = useState(initial.priority_id || 1);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setFormError('Title is required');
      return;
    }
    if (!priority) {
      setFormError('Priority is required');
      return;
    }
    setFormError('');
    onSubmit({ title, description, due_date: dueDate, priority_id: priority });
  };

  return (
    <form
      className='bg-white p-4 rounded mx-auto needs-validation'
      style={{ maxWidth: 500 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className='text-center mb-4 fw-bold'>
        {initial.id ? 'Edit Task' : 'New Task'}
      </h2>
      {formError && (
        <div className='alert alert-danger py-2 mb-2'>{formError}</div>
      )}
      {error && <div className='alert alert-danger py-2 mb-2'>{error}</div>}
      <div className='mb-3'>
        <label className='form-label'>Title</label>
        <input
          className='form-control'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Description</label>
        <textarea
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Due Date</label>
        <input
          className='form-control'
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='form-label'>Priority</label>
        <select
          className='form-select'
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          required
        >
          {priorities.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className='btn btn-primary w-100'
        type='submit'
        disabled={loading}
      >
        {loading
          ? initial.id
            ? 'Saving...'
            : 'Creating...'
          : initial.id
          ? 'Save Task'
          : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
