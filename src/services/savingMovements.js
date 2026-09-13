import { supabase } from './supabase';

export async function createSavingsMovement(
  userId,
  savingsGoalId,
  movementData,
) {
  const movement = {
    user_id: userId,
    savings_goal_id: savingsGoalId,
    amount: movementData.amount,
    date: movementData.date,
    description: movementData.description || null,
  };

  console.log('Movement being inserted:', movement);

  const { data, error } = await supabase
    .from('savings_movements')
    .insert(movement)
    .select()
    .single();

  if (error) {
    console.error('CODE:', error.code);
    console.error('MESSAGE:', error.message);
    console.error('DETAILS:', error.details);
    console.error('HINT:', error.hint);

    throw error;
  }

  return data;
}
