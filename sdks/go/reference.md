# Reference
## Tasks
<details><summary><code>client.Tasks.ListTasks() -> *taskboard.TaskList</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a paginated list of tasks. Optionally filter by project, status, or priority.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.ListTasksRequest{}
client.Tasks.ListTasks(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectID:** `*string` — Filter tasks by project ID
    
</dd>
</dl>

<dl>
<dd>

**status:** `*taskboard.TaskStatus` — Filter tasks by status
    
</dd>
</dl>

<dl>
<dd>

**priority:** `*taskboard.TaskPriority` — Filter tasks by priority
    
</dd>
</dl>

<dl>
<dd>

**limit:** `*int` — Maximum number of tasks to return
    
</dd>
</dl>

<dl>
<dd>

**offset:** `*int` — Number of tasks to skip
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Tasks.CreateTask(request) -> *taskboard.Task</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new task and returns it.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.CreateTaskRequest{
        Title: "title",
    }
client.Tasks.CreateTask(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**title:** `string` — Short summary of the task
    
</dd>
</dl>

<dl>
<dd>

**description:** `*string` — Detailed description of the task
    
</dd>
</dl>

<dl>
<dd>

**status:** `*taskboard.TaskStatus` 
    
</dd>
</dl>

<dl>
<dd>

**priority:** `*taskboard.TaskPriority` 
    
</dd>
</dl>

<dl>
<dd>

**projectID:** `*string` — The project to assign this task to
    
</dd>
</dl>

<dl>
<dd>

**assignee:** `*string` — Email of the person to assign
    
</dd>
</dl>

<dl>
<dd>

**dueDate:** `*time.Time` — The date this task is due
    
</dd>
</dl>

<dl>
<dd>

**tags:** `[]string` — Labels to attach to this task
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Tasks.GetTask(TaskID) -> *taskboard.Task</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a single task by its ID.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.GetTaskRequest{
        TaskID: "task_id",
    }
client.Tasks.GetTask(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**taskID:** `string` — The unique identifier of the task
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Tasks.DeleteTask(TaskID) -> error</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently deletes a task.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.DeleteTaskRequest{
        TaskID: "task_id",
    }
client.Tasks.DeleteTask(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**taskID:** `string` — The unique identifier of the task
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Tasks.UpdateTask(TaskID, request) -> *taskboard.Task</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates an existing task. Only provided fields will be changed.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.UpdateTaskRequest{
        TaskID: "task_id",
    }
client.Tasks.UpdateTask(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**taskID:** `string` — The unique identifier of the task
    
</dd>
</dl>

<dl>
<dd>

**title:** `*string` 
    
</dd>
</dl>

<dl>
<dd>

**description:** `*string` 
    
</dd>
</dl>

<dl>
<dd>

**status:** `*taskboard.TaskStatus` 
    
</dd>
</dl>

<dl>
<dd>

**priority:** `*taskboard.TaskPriority` 
    
</dd>
</dl>

<dl>
<dd>

**projectID:** `*string` 
    
</dd>
</dl>

<dl>
<dd>

**assignee:** `*string` 
    
</dd>
</dl>

<dl>
<dd>

**dueDate:** `*time.Time` 
    
</dd>
</dl>

<dl>
<dd>

**tags:** `[]string` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Projects
<details><summary><code>client.Projects.ListProjects() -> []*taskboard.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns all projects accessible to the authenticated user.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
client.Projects.ListProjects(
        context.TODO(),
    )
}
```
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Projects.CreateProject(request) -> *taskboard.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new project.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.CreateProjectRequest{
        Name: "name",
    }
client.Projects.CreateProject(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**name:** `string` — Name of the project
    
</dd>
</dl>

<dl>
<dd>

**description:** `*string` — A brief description of the project
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Projects.GetProject(ProjectID) -> *taskboard.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a single project by its ID.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.GetProjectRequest{
        ProjectID: "project_id",
    }
client.Projects.GetProject(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectID:** `string` — The unique identifier of the project
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Projects.DeleteProject(ProjectID) -> error</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently deletes a project and all its tasks.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```go
request := &taskboard.DeleteProjectRequest{
        ProjectID: "project_id",
    }
client.Projects.DeleteProject(
        context.TODO(),
        request,
    )
}
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectID:** `string` — The unique identifier of the project
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>
