// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  task_ids: JSON;
  project_ids: JSON;
};

export type Task = {
  id: string;
  title: string;
  task: string;
  creator_id: string;
  worker_ids: JSON;
  status: 'todo' | 'done' | 'inprogress';
}

export type Project = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority_ids: JSON;
  task_ids: JSON;
  admin_ids: JSON;
  manager_ids: JSON;
  worker_ids: JSON;
}

