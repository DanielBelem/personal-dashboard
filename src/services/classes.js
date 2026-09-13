import { supabase } from './supabase';

export async function getClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('weekday', { ascending: true })
    .order('start_time', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}