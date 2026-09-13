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

export async function createClass(userId, classData) {
  const { data, error } = await supabase
    .from('classes')
    .insert({
      user_id: userId,
      subject: classData.subject,
      weekday: classData.weekday,
      start_time: classData.startTime,
      end_time: classData.endTime,
      room: classData.room || null,
      class_type: classData.classType || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteClass(classId) {
  const { error } = await supabase
    .from('classes')
    .delete()
    .eq('id', classId);

  if (error) {
    throw error;
  }
}