export type Event = {
  title: string;
  backgroundColor: string;
  textColor: string;
  start: string | Date;
  end: string | Date;
  daysOfWeek: [];
  extendedProps: {
    department: string;
  };
  rrule: {
    freq: string;
  };
};
