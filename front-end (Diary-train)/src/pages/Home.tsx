import { useEffect, useState } from 'react';
import { workoutService } from '../services/workoutService';
import { type WorkoutResponse } from '../types/workout';
import { WorkoutForm } from '../components/WorkoutForm';

export function Home() {
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutResponse | null>(null);
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getAllWorkouts();
      setWorkouts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDeleteClick = (id: string) => {
    setWorkoutToDelete(id);
  };

  const confirmDelete = async () => {
    if (!workoutToDelete) return; 

    try {
      await workoutService.deleteWorkout(workoutToDelete);
      fetchWorkouts(); 
      setWorkoutToDelete(null); 
    } catch (error) {
      alert('Erro ao excluir o treino.');
      console.error(error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    
    if (workouts.length === 0) {
      return (
        <div className="text-center py-16 border border-dashed border-slate-700 bg-slate-800/50 rounded-2xl">
          <p className="text-slate-400 font-medium">O templo está vazio.</p>
          <p className="text-slate-500 text-sm mt-1">Registre seu primeiro treino ao lado.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div 
            key={workout.id} 
            className="group relative bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg hover:border-amber-500/50 transition-all duration-300 flex flex-col"
          >
            <button 
                onClick={() => handleDeleteClick(workout.id)}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Excluir treino"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>

            <button 
              onClick={() => setEditingWorkout(workout)}
              className="absolute top-4 right-12 text-slate-500 hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Editar treino"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 uppercase tracking-wide">{workout.type}</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(workout.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black text-white">{workout.durationInMinutes}</span>
              <span className="text-sm text-slate-400 ml-2 font-medium uppercase tracking-wider">min</span>
            </div>

            <p className="text-slate-400 text-sm italic border-t border-slate-800 pt-4 mt-auto leading-relaxed">
              {workout.notes || "Sem notas adicionais."}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              Sovereign<span className="text-amber-500">Fit</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide">PAINEL DE ALTA PERFORMANCE</p>
          </div>
          <div className="h-14 w-14 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="font-black text-slate-900 text-2xl">A</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 xl:col-span-3">
            <WorkoutForm 
              key={editingWorkout ? editingWorkout.id : 'create-mode'} 
              onWorkoutSaved={() => {
                fetchWorkouts();
                setEditingWorkout(null);
              }}
              workoutToEdit={editingWorkout}
              onCancel={() => setEditingWorkout(null)} 
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                Histórico de Batalhas
                <span className="bg-slate-900 text-amber-500 text-sm px-3 py-1 rounded-full border border-slate-800 font-black">
                  {workouts.length}
                </span>
              </h2>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>

      {workoutToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="text-xl font-bold text-white">Excluir Registro</h3>
            </div>
            
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Tem certeza que deseja apagar este treino do seu histórico? Esta ação é permanente e não poderá ser desfeita.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setWorkoutToDelete(null)} 
                className="px-4 py-2.5 rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors font-medium text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2.5 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors font-bold text-sm shadow-lg shadow-red-900/20 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}