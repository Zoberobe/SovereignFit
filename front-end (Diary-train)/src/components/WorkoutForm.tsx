import { useState } from 'react';
import { workoutService } from '../services/workoutService';
import { type CreateWorkoutRequest, type WorkoutResponse } from '../types/workout';

interface Props {
  onWorkoutSaved: () => void;
  workoutToEdit?: WorkoutResponse | null;
  onCancel: () => void;
}

export function WorkoutForm({ onWorkoutSaved, workoutToEdit, onCancel }: Props) {
  const [form, setForm] = useState<CreateWorkoutRequest>({
    type: workoutToEdit?.type || '',
    durationInMinutes: workoutToEdit?.durationInMinutes || 0,
    notes: workoutToEdit?.notes || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (workoutToEdit) {
        await workoutService.updateWorkout(workoutToEdit.id, form);
      } else {
        await workoutService.createWorkout(form);
      }
      onWorkoutSaved(); 
    } catch (error) {
      alert("Erro ao salvar. Verifique se o backend C# está rodando.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-amber-500">
        {workoutToEdit ? 'Editar Registro' : 'Novo Treino'}
      </h3>
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Modalidade (Ex: Boxe, Jiu-Jitsu)" 
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-amber-500 outline-none transition-all text-white placeholder-slate-500"
          value={form.type}
          onChange={e => setForm({...form, type: e.target.value})}
          required
        />
        <input 
          type="number" 
          placeholder="Duração (min)" 
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-amber-500 outline-none transition-all text-white placeholder-slate-500"
          value={form.durationInMinutes || ''}
          onChange={e => setForm({...form, durationInMinutes: Number(e.target.value)})}
          required
        />
        <textarea 
          placeholder="Observações técnicas..." 
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-amber-500 outline-none transition-all h-24 text-white placeholder-slate-500 resize-none"
          value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
        />
        
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl transition-all uppercase tracking-tighter cursor-pointer">
            {workoutToEdit ? 'Salvar Alterações' : 'Consolidar Treino'}
          </button>
          
          {workoutToEdit && (
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}