const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const classes = [
  {
    id: 1,
    subject: 'Compilers',
    weekday: 'Monday',
    startTime: '10:00',
    endTime: '12:00',
    room: 'B103',
    type: 'TP',
  },
  {
    id: 2,
    subject: 'Computer Graphics',
    weekday: 'Tuesday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'B201',
    type: 'PL',
  },
  {
    id: 3,
    subject: 'Physics',
    weekday: 'Thursday',
    startTime: '09:00',
    endTime: '11:00',
    room: 'A101',
    type: 'T',
  },
];

function ScheduleSection() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Schedule
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-neutral-900">
            Weekly classes
          </h2>
        </div>

        <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700">
          Add class
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {days.map((day) => {
          const dayClasses = classes.filter(
            (classItem) => classItem.weekday === day,
          );

          return (
            <div
              key={day}
              className="min-h-52 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            >
              <h3 className="mb-4 font-semibold text-neutral-900">
                {day}
              </h3>

              <div className="space-y-3">
                {dayClasses.length === 0 ? (
                  <p className="text-sm text-neutral-400">
                    No classes
                  </p>
                ) : (
                  dayClasses.map((classItem) => (
                    <article
                      key={classItem.id}
                      className="rounded-lg border border-neutral-200 bg-white p-3"
                    >
                      <p className="font-medium text-neutral-900">
                        {classItem.subject}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {classItem.startTime} – {classItem.endTime}
                      </p>

                      <div className="mt-3 flex justify-between text-xs text-neutral-400">
                        <span>{classItem.room}</span>
                        <span>{classItem.type}</span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ScheduleSection;