import { TaskboardClient } from "@taskboard/sdk";

const token = process.env.TASKBOARD_TOKEN ?? "test-token";
const baseUrl = process.env.TASKBOARD_BASE_URL ?? "http://localhost:8080";

const client = new TaskboardClient({
  token,
  environment: baseUrl,
});

async function main() {
  console.log("=== Taskboard TypeScript SDK Test (Bun) ===\n");

  console.log("Creating a project...");
  const project = await client.projects.createProject({
    name: "Bun SDK Test Project",
    description: "Created from the Bun test app",
  });
  console.log(`  Created project: ${project.name} (id: ${project.id})\n`);

  console.log("Creating tasks...");
  const taskInputs = [
    {
      title: "Implement auth middleware",
      priority: "high" as const,
      status: "todo" as const,
      project_id: project.id,
      tags: ["backend", "auth"],
    },
    {
      title: "Design dashboard UI",
      priority: "medium" as const,
      status: "in_progress" as const,
      project_id: project.id,
      tags: ["frontend", "design"],
    },
    {
      title: "Write API documentation",
      priority: "low" as const,
      status: "backlog" as const,
      tags: ["docs"],
    },
  ];

  const createdTasks = [];
  for (const input of taskInputs) {
    const task = await client.tasks.createTask(input);
    createdTasks.push(task);
    console.log(`  Created: ${task.title} [${task.priority}] (id: ${task.id})`);
  }
  console.log();

  console.log("Listing all tasks...");
  const taskList = await client.tasks.listTasks({ limit: 10 });
  console.log(`  Found ${taskList.data.length} tasks (total: ${taskList.total})`);
  for (const t of taskList.data) {
    console.log(`    - ${t.title} [status: ${t.status}, priority: ${t.priority}]`);
  }
  console.log();

  console.log("Updating first task to done...");
  const updated = await client.tasks.updateTask({
    task_id: createdTasks[0].id,
    status: "done",
  });
  console.log(`  Updated: ${updated.title} -> status: ${updated.status}\n`);

  console.log("Fetching single task...");
  const fetched = await client.tasks.getTask({ task_id: createdTasks[1].id });
  console.log(`  Task: ${fetched.title}`);
  console.log(`  Status: ${fetched.status}`);
  console.log(`  Tags: ${fetched.tags?.join(", ")}\n`);

  console.log("Listing projects...");
  const projectsList = await client.projects.listProjects();
  for (const p of projectsList) {
    console.log(`  - ${p.name} (id: ${p.id})`);
  }
  console.log();

  console.log("=== All tests passed! ===");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
