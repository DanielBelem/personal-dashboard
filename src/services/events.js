import { supabase } from './supabase';

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_time', {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function createEvent(
  userId,
  eventData,
) {
  const { data, error } = await supabase
    .from('events')
    .insert({
      user_id: userId,

      name: eventData.name,
      description:
        eventData.description || null,

      recurring: eventData.recurring,

      weekday: eventData.weekday,
      date: eventData.date,

      start_time: eventData.startTime,
      end_time: eventData.endTime || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteEvent(eventId) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId);

  if (error) {
    throw error;
  }
}