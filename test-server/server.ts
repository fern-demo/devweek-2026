const PORT = parseInt(process.env.PORT ?? "8080", 10);

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  project_id?: string;
  assignee?: string;
  due_date?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

const tasks: Map<string, Task> = new Map();
const projects: Map<string, Project> = new Map();

function uuid(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function error(message: string, status: number): Response {
  return json({ message }, status);
}

function checkAuth(req: Request): Response | null {
  const auth = req.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return error("Missing or invalid authentication", 401);
  }
  return null;
}

function matchRoute(
  method: string,
  pathname: string,
  reqMethod: string,
  pattern: string,
): Record<string, string> | null {
  if (method !== reqMethod) return null;
  const patternParts = pattern.split("/");
  const pathParts = pathname.split("/");
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { pathname, searchParams } = url;
  const method = req.method;

  const authErr = checkAuth(req);
  if (authErr) return authErr;

  // --- Tasks ---

  let params = matchRoute("GET", pathname, method, "/tasks");
  if (params) {
    let items = [...tasks.values()];

    const projectId = searchParams.get("project_id");
    if (projectId) items = items.filter((t) => t.project_id === projectId);

    const status = searchParams.get("status");
    if (status) items = items.filter((t) => t.status === status);

    const priority = searchParams.get("priority");
    if (priority) items = items.filter((t) => t.priority === priority);

    const total = items.length;
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    items = items.slice(offset, offset + limit);

    return json({ data: items, total, limit, offset });
  }

  params = matchRoute("POST", pathname, method, "/tasks");
  if (params) {
    const body = await req.json();
    if (!body.title) return error("title is required", 400);
    const task: Task = {
      id: uuid(),
      title: body.title,
      description: body.description,
      status: body.status ?? "backlog",
      priority: body.priority ?? "medium",
      project_id: body.project_id,
      assignee: body.assignee,
      due_date: body.due_date,
      tags: body.tags,
      created_at: now(),
      updated_at: now(),
    };
    tasks.set(task.id, task);
    return json(task, 201);
  }

  params = matchRoute("GET", pathname, method, "/tasks/:task_id");
  if (params) {
    const task = tasks.get(params.task_id);
    if (!task) return error("Task not found", 404);
    return json(task);
  }

  params = matchRoute("PATCH", pathname, method, "/tasks/:task_id");
  if (params) {
    const task = tasks.get(params.task_id);
    if (!task) return error("Task not found", 404);
    const body = await req.json();
    if (body.title !== undefined) task.title = body.title;
    if (body.description !== undefined) task.description = body.description;
    if (body.status !== undefined) task.status = body.status;
    if (body.priority !== undefined) task.priority = body.priority;
    if (body.project_id !== undefined) task.project_id = body.project_id;
    if (body.assignee !== undefined) task.assignee = body.assignee;
    if (body.due_date !== undefined) task.due_date = body.due_date;
    if (body.tags !== undefined) task.tags = body.tags;
    task.updated_at = now();
    return json(task);
  }

  params = matchRoute("DELETE", pathname, method, "/tasks/:task_id");
  if (params) {
    if (!tasks.has(params.task_id)) return error("Task not found", 404);
    tasks.delete(params.task_id);
    return new Response(null, { status: 204 });
  }

  // --- Projects ---

  params = matchRoute("GET", pathname, method, "/projects");
  if (params) {
    return json([...projects.values()]);
  }

  params = matchRoute("POST", pathname, method, "/projects");
  if (params) {
    const body = await req.json();
    if (!body.name) return error("name is required", 400);
    const project: Project = {
      id: uuid(),
      name: body.name,
      description: body.description,
      created_at: now(),
    };
    projects.set(project.id, project);
    return json(project, 201);
  }

  params = matchRoute("GET", pathname, method, "/projects/:project_id");
  if (params) {
    const project = projects.get(params.project_id);
    if (!project) return error("Project not found", 404);
    return json(project);
  }

  params = matchRoute("DELETE", pathname, method, "/projects/:project_id");
  if (params) {
    if (!projects.has(params.project_id)) return error("Project not found", 404);
    for (const [id, task] of tasks) {
      if (task.project_id === params.project_id) tasks.delete(id);
    }
    projects.delete(params.project_id);
    return new Response(null, { status: 204 });
  }

  return error("Not found", 404);
}

console.log(`Taskboard test server running on http://localhost:${PORT}`);

Bun.serve({
  port: PORT,
  fetch: handleRequest,
});
