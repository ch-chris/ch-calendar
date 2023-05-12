// /* eslint-disable no-console */
/* OLD FUNCTION */
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

//* FOR CALLBACK: eventContent */
// export const renderEventContent = function (info) {
//   const titleEl = document.createElement('p');
//   titleEl.classList.add('ev_fc-title');
//   titleEl.textContent = info.event.title;

//   const departmentEl = document.createElement('p');
//   departmentEl.classList.add('ev_fc-department');
//   departmentEl.textContent = info.event.extendedProps.department;

//   const arrayOfDomNodes = [departmentEl, titleEl];
//   return { domNodes: arrayOfDomNodes };
// };

/* OLD FUNCTION FOR CALLBACK: eventDidMount */
// const renderListColor = function (info) {
//     const element = info.el;
//     const listEl = document.createElement('p');
//     listEl.textContent = info.event.start;
//     element.style.backgroundColor = info.event.backgroundColor;
//     element.querySelector('.fc-list-event-title').append(listEl);
//   };

export const renderListContent = function (info) {
  const element = info.el;

  /* use f below for rendering any obj
    const timeEl = document.createElement('p');
    titleEl.classList.add('ev_fc-time');
    titleEl.textContent = info.event.start;
  */

  const departmentEl = document.createElement('p');
  departmentEl.classList.add('ev_fc-department');
  departmentEl.textContent = info.event.extendedProps.department;

  element.style.backgroundColor = info.event.backgroundColor;
  element.querySelector('.fc-list-event-title').prepend(departmentEl);
};
