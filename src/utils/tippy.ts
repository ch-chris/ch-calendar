import tippy from 'tippy.js';

tippy.setDefaultProps({ maxWidth: '500px' });
export const myTippy = function (info) {
  // const myTipDept = document.createElement('p');
  // myTipDept.classList.add('ev_fc-department');
  // myTipDept.textContent = info.event.extendedProps.department;
  // myTipDept.style.display = 'block';
  // const myTipTitle = document.createElement('p');
  // myTipTitle.textContent = info.event.title;
  // myTipTitle.style.display = 'block';
  // const myTipDate = document.createElement('p');
  // myTipDate.textContent = info.event.start.toLocaleTimeString([], { timeStyle: 'short' });
  // myTipDate.style.display = 'block';
  const myTipDept = info.event.extendedProps.department;
  const myTipTitle = info.event.title;
  const myTipDate = info.event.start.toLocaleTimeString([], { timeStyle: 'short' });
  const fragment = document.createDocumentFragment();

  const myTipContent = [myTipDept, myTipTitle + ' @ ' + myTipDate];
  let count = 0;
  myTipContent.forEach((content) => {
    const div = document.createElement('div');
    div.classList.add('ev_fc-tip-' + count);
    div.textContent = content;
    fragment.appendChild(div);
    count = count + 1;
  });

  const tip = tippy(info.el, {
    theme: 'ch',
    content: fragment,
    trigger: 'click',
  });
};
