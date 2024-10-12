export const allowOptions = [
  'add',
  'update',
  'delete',
  'mark-in-progress',
  'mark-done',
  'list',
  'list done',
  'list todo',
  'list in-progress',
]

const options = {
  timeZone: 'America/Lima',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const formatter = new Intl.DateTimeFormat('en-GB', options);
const peruDate = formatter.format(new Date());

const [date, time] = peruDate.split(',')
const [day, month, year] = date.split('/')

export const formatterDate = `${year}-${month}-${day} ${time}`