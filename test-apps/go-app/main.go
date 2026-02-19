package main

import (
	"context"
	"fmt"
	"log"
	"os"

	taskboard "github.com/taskboard/taskboard-go"
	client "github.com/taskboard/taskboard-go/client"
	"github.com/taskboard/taskboard-go/option"
)

func main() {
	token := os.Getenv("TASKBOARD_TOKEN")
	if token == "" {
		token = "test-token"
	}
	baseURL := os.Getenv("TASKBOARD_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}

	c := client.NewClient(
		option.WithToken(token),
		option.WithBaseURL(baseURL),
	)

	ctx := context.Background()

	fmt.Println("=== Taskboard Go SDK Test ===")
	fmt.Println()

	fmt.Println("Creating a project...")
	project, err := c.Projects.CreateProject(ctx, &taskboard.CreateProjectRequest{
		Name:        "Go SDK Test Project",
		Description: strPtr("Created from the Go test app"),
	})
	if err != nil {
		log.Fatalf("Failed to create project: %v", err)
	}
	fmt.Printf("  Created project: %s (id: %s)\n\n", project.Name, project.ID)

	fmt.Println("Creating tasks...")
	taskReqs := []taskboard.CreateTaskRequest{
		{
			Title:     "Set up CI/CD pipeline",
			Priority:  taskboard.TaskPriorityHigh.Ptr(),
			Status:    taskboard.TaskStatusTodo.Ptr(),
			ProjectID: &project.ID,
			Tags:      []string{"devops", "infrastructure"},
		},
		{
			Title:     "Write unit tests",
			Priority:  taskboard.TaskPriorityMedium.Ptr(),
			Status:    taskboard.TaskStatusInProgress.Ptr(),
			ProjectID: &project.ID,
			Tags:      []string{"testing"},
		},
		{
			Title:    "Update README",
			Priority: taskboard.TaskPriorityLow.Ptr(),
			Status:   taskboard.TaskStatusBacklog.Ptr(),
			Tags:     []string{"docs"},
		},
	}

	var createdIDs []string
	for _, req := range taskReqs {
		task, err := c.Tasks.CreateTask(ctx, &req)
		if err != nil {
			log.Fatalf("Failed to create task: %v", err)
		}
		createdIDs = append(createdIDs, task.ID)
		fmt.Printf("  Created: %s [%s] (id: %s)\n", task.Title, task.Priority, task.ID)
	}
	fmt.Println()

	fmt.Println("Listing all tasks...")
	limit := 10
	taskList, err := c.Tasks.ListTasks(ctx, &taskboard.ListTasksRequest{
		Limit: &limit,
	})
	if err != nil {
		log.Fatalf("Failed to list tasks: %v", err)
	}
	fmt.Printf("  Found %d tasks (total: %d)\n", len(taskList.Data), taskList.Total)
	for _, t := range taskList.Data {
		fmt.Printf("    - %s [status: %s, priority: %s]\n", t.Title, t.Status, t.Priority)
	}
	fmt.Println()

	fmt.Println("Updating first task to done...")
	updated, err := c.Tasks.UpdateTask(ctx, &taskboard.UpdateTaskRequest{
		TaskID: createdIDs[0],
		Status: taskboard.TaskStatusDone.Ptr(),
	})
	if err != nil {
		log.Fatalf("Failed to update task: %v", err)
	}
	fmt.Printf("  Updated: %s -> status: %s\n\n", updated.Title, updated.Status)

	fmt.Println("Fetching single task...")
	fetched, err := c.Tasks.GetTask(ctx, &taskboard.GetTaskRequest{
		TaskID: createdIDs[1],
	})
	if err != nil {
		log.Fatalf("Failed to get task: %v", err)
	}
	fmt.Printf("  Task: %s\n", fetched.Title)
	fmt.Printf("  Status: %s\n", fetched.Status)
	fmt.Printf("  Tags: %v\n\n", fetched.Tags)

	fmt.Println("Listing projects...")
	projectList, err := c.Projects.ListProjects(ctx)
	if err != nil {
		log.Fatalf("Failed to list projects: %v", err)
	}
	for _, p := range projectList {
		fmt.Printf("  - %s (id: %s)\n", p.Name, p.ID)
	}
	fmt.Println()

	fmt.Println("=== All tests passed! ===")
}

func strPtr(s string) *string {
	return &s
}
