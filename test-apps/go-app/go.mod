module github.com/taskboard/go-test-app

go 1.21

require github.com/taskboard/taskboard-go v0.0.0

require github.com/google/uuid v1.6.0 // indirect

replace github.com/taskboard/taskboard-go => ../../sdks/go
