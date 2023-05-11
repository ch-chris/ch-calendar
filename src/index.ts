import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

// import { addProps } from '$utils/addprops';
import { type Event } from '$utils/types';

window.Webflow ||= [];
window.Webflow.push(() => {
  const gridCalendarEl = document.querySelector<HTMLElement>('[ev-element = "grid-view"]');
  if (!gridCalendarEl) return;
  const listCalendarEl = document.querySelector<HTMLElement>('[ev-element = "list-view"]');
  if (!listCalendarEl) return;

  const getEvents = (): Event[] => {
    const scripts = document.querySelectorAll<HTMLScriptElement>('[ev-element = "event-data"]');
    const events = [...scripts].map((script) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const event: Event = JSON.parse(script.textContent!);
      event.start = new Date(event.start);
      event.end = new Date(event.end);
      return event;
    });
    return events;
  };
  const events = getEvents();
  // eslint-disable-next-line no-console
  console.log(events);

  const gridCalendar = new Calendar(gridCalendarEl, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today',
    },
    events,
    datesSet: function (info) {
      syncCalendar(listCalendar, info.view.currentStart);
    },
  });
  const listCalendar = new Calendar(listCalendarEl, {
    plugins: [listPlugin],
    initialView: 'listMonth',
    headerToolbar: {
      left: '',
      center: '',
      right: '',
    },
    events,
    datesSet: function (info) {
      syncCalendar(gridCalendar, info.view.currentStart);
    },
  });

  gridCalendar.render();
  listCalendar.render();

  function syncCalendar(otherCalendar: Calendar, startDate: Date) {
    // console.log(otherCalendar.getDate().toDateString(), '-', startDate.toDateString());
    if (otherCalendar.getDate().toDateString() !== startDate.toDateString()) {
      otherCalendar.gotoDate(startDate);
      console.log(startDate);
    }
  }
  // const getEvents = [
  //   {
  //     title: 'Dr. Presentation',
  //     startTime: '15:30',
  //     daysOfWeek: [0],
  //     extendedProps: {
  //       department: 'CalerieHealth University',
  //     },
  //   },
  //   {
  //     title: 'The tfdsfd',
  //     start: '2023-05-01',
  //   },
  // ];
});
