-- EVENTS

drop policy if exists "Users can read own events"
on public.events;

drop policy if exists "Users can create own events"
on public.events;

drop policy if exists "Users can update own events"
on public.events;

drop policy if exists "Users can delete own events"
on public.events;


create policy "Users can read own events"
on public.events
for select
to authenticated
using (
  (select auth.uid()) = user_id
);


create policy "Users can create own events"
on public.events
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);


create policy "Users can update own events"
on public.events
for update
to authenticated
using (
  (select auth.uid()) = user_id
)
with check (
  (select auth.uid()) = user_id
);


create policy "Users can delete own events"
on public.events
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);


-- ACCOUNT MOVEMENTS

drop policy if exists "Users can read own account movements"
on public.account_movements;

drop policy if exists "Users can create own account movements"
on public.account_movements;

drop policy if exists "Users can update own account movements"
on public.account_movements;

drop policy if exists "Users can delete own account movements"
on public.account_movements;


create policy "Users can read own account movements"
on public.account_movements
for select
to authenticated
using (
  (select auth.uid()) = user_id
);


create policy "Users can create own account movements"
on public.account_movements
for insert
to authenticated
with check (
  (select auth.uid()) = user_id

  and exists (
    select 1
    from public.accounts
    where accounts.id = account_movements.account_id
      and accounts.user_id = (select auth.uid())
  )
);


create policy "Users can update own account movements"
on public.account_movements
for update
to authenticated
using (
  (select auth.uid()) = user_id
)
with check (
  (select auth.uid()) = user_id

  and exists (
    select 1
    from public.accounts
    where accounts.id = account_movements.account_id
      and accounts.user_id = (select auth.uid())
  )
);


create policy "Users can delete own account movements"
on public.account_movements
for delete
to authenticated
using (
  (select auth.uid()) = user_id
);



-- ENSURE RLS IS ENABLED


alter table public.events
enable row level security;

alter table public.account_movements
enable row level security;


-- GRANTS

grant select, insert, update, delete
on table
  public.events,
  public.account_movements
to authenticated;

-- CONSTRAINTS


-- Recurring vs one-time
alter table public.events
add constraint events_schedule_check
check (
  (
    recurring = true
    and weekday is not null
    and date is null
  )
  or
  (
    recurring = false
    and date is not null
    and weekday is null
  )
);

-- Weekday 1-7

alter table public.events
add constraint events_weekday_check
check (
  weekday is null
  or weekday between 1 and 7
);

-- End time > start_time

alter table public.events
add constraint events_time_check
check (
  end_time is null
  or end_time > start_time
);

-- Name != empty

alter table public.events
add constraint events_name_check
check (
  length(trim(name)) > 0
);