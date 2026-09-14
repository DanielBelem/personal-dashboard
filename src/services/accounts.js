import { supabase } from './supabase';

export async function getAccounts() {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('NAO DA PRA IR BUSCAR AS CONTAS:', error);
    throw error;
  }

  return data;
}

export async function createAccount(userId, accountData) {
  const { data, error } = await supabase
    .from('accounts')
    .insert({
      user_id: userId,
      name: accountData.name,
      type: accountData.type,
      initial_bal: accountData.initial_bal,
    })
    .select()
    .single();

  if (error) {
    console.error('ERRO A CRIAR CONTA BURR:', error);
    throw error;
  }

  return data;
}

export async function deleteAccount(accountId) {
  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', accountId);

  if (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
}