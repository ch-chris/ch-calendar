import { Calendar } from '@fullcalendar/core';
//import { createElement } from '@fullcalendar/core/preact';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';

import { renderListContent } from '$utils/props';
import { renderGridContent } from '$utils/props';
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
  //console.log(events);

  const gridCalendar = new Calendar(gridCalendarEl, {
    plugins: [rrulePlugin, dayGridPlugin],
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
    eventDidMount: renderGridContent,
  });
  const listCalendar = new Calendar(listCalendarEl, {
    plugins: [rrulePlugin, listPlugin],
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
    eventDidMount: renderListContent,
  });

  gridCalendar.render();
  listCalendar.render();

  function syncCalendar(otherCalendar: Calendar, startDate: Date) {
    if (otherCalendar.getDate().toDateString() !== startDate.toDateString()) {
      otherCalendar.gotoDate(startDate);
    }
  }
});
