// /* eslint-disable no-console */

// export function addProps() {
//   const eventTitle = document.querySelectorAll('.fc-event-title,.fc-list-event-title');
//   eventTitle.forEach((title) => {
//     //const { department } = extendedProps;
//     const departmentEl = document.createElement('p');
//     departmentEl.classList.add('ev_department-name');
//     departmentEl.textContent = info.event.extendedProps.department;
//     title.prepend(departmentEl);
//   });
// }

export const renderEventContent = function (info) {
  const titleEl = document.createElement('p');
  titleEl.classList.add('ev_fc-title');
  titleEl.textContent = info.event.title;

  const departmentEl = document.createElement('p');
  departmentEl.classList.add('ev_fc-department');
  departmentEl.textContent = info.event.extendedProps.department;

  const arrayOfDomNodes = [departmentEl, titleEl];
  return { domNodes: arrayOfDomNodes };
};
