// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    task_ids: JSON.stringify([
        'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      ]),
    project_ids: JSON.stringify([])
  },
];



const tasks = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    title: 'Evil Rabbit',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    title: 'Delba de Oliveira',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    title: 'Lee Robinson',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    title: 'Michael Novotny',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    title: 'Amy Burns',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    title: 'Balazs Orban',
    task: 'Hello',
    creator_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
];

const invoices = [
  {
    customer_id: tasks[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: tasks[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: tasks[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: tasks[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: tasks[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: tasks[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: tasks[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: tasks[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: tasks[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: tasks[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: tasks[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: tasks[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: tasks[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, tasks, invoices, revenue };
