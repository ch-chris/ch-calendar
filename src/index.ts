import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import { renderEventContent } from '$utils/props';
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
  console.log(events);

  const renderListColor = function (info) {
    const listEl = document.querySelectorAll<HTMLElement>('.fc-list-event');
    listEl.forEach((item) => {
      item.classList.add('ev_fc-background');
      item.style.backgroundColor = info.event.backgroundColor;
      console.log(info.event.backgroundColor);
    });
  };

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
    // eventContent: renderEventContent,
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
    eventContent: renderEventContent,
  });

  gridCalendar.render();
  listCalendar.render();

  function syncCalendar(otherCalendar: Calendar, startDate: Date) {
    // console.log(otherCalendar.getDate().toDateString(), '-', startDate.toDateString());
    if (otherCalendar.getDate().toDateString() !== startDate.toDateString()) {
      otherCalendar.gotoDate(startDate);
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
