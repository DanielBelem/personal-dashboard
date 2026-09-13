import { supabase } from './supabase';

export async function getSavings() {
  const { data, error } = await supabase
    .from('savings_goals')
    .select(
      `
      *,
      savings_movements (
        id,
        amount,
        date,
        description,
        created_at
      )
    `,
    )
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createSavings(userId, savingsData) {
  const { data, error } = await supabase
    .from('savings_goals')
    .insert({
      user_id: userId,
      name: savingsData.name,
      target_amount: savingsData.targetAmount,
      deadline: savingsData.deadline || null,
      description: savingsData.description || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteSavings(savingsId) {
  const { error } = await supabase
    .from('savings_goals')
    .delete()
    .eq('id', savingsId);

  if (error) {
    throw error;
  }
}
