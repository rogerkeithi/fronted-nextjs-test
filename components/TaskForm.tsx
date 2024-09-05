import { Task } from '@/utils/entities/Task';
import { useState, useEffect } from 'react';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (taskData: { title: string; description: string; dueDate: string }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (title && description && dueDate) {
      onSubmit({ title, description, dueDate });
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Título da tarefa"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição da tarefa"
        className="border p-2 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        placeholder="Data de expiração"
        className="border p-2 mb-2 w-full"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
        onClick={handleSubmit}
      >
        {initialData ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded ml-2"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </div>
  );
};

export default TaskForm;
