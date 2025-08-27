export interface Activity {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedDuration?: number; // minutos
}
