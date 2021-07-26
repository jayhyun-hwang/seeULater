package usecases_test

import (
	"fmt"
	"seeULater/goServers/entities"
	"seeULater/goServers/usecases"
	"testing"

	"github.com/gomagedon/expectate"
)

var dummyTodos = []entities.Todo{
	{
		Title:        "todo 1",
		Description:  "description of todo 1",
		IsComplieted: true,
	},
	{
		Title:        "todo 2",
		Description:  "description of todo 2",
		IsComplieted: false,
	},
	{
		Title:        "todo 3",
		Description:  "description of todo 3",
		IsComplieted: true,
	},
}

type BadTodosRepo struct{}

func (BadTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	return nil, fmt.Errorf("something went wrong")
}

type MockTodosRepo struct{}

func (MockTodosRepo) GetAllTodos() ([]entities.Todo, error) {
	return dummyTodos, nil
}
func TestGetTodos(t *testing.T) {
	//Test
	t.Run("Returns ErrInternal when TodosRepository returns error", func(t *testing.T) {

		expect := expectate.Expect(t)

		repo := new(BadTodosRepo)

		todos, err := usecases.GetTodos(repo)

		expect(err).ToBe(usecases.ErrInternal)
		if todos != nil {
			t.Fatalf("Expected todos to be nil; Got: %v", todos)
		}
	})

	//Test
	t.Run("Returns todos from TodosRepository", func(t *testing.T) {
		expect := expectate.Expect(t)
		repo := new(MockTodosRepo)

		todos, err := usecases.GetTodos(repo)

		expect(err).ToBe(nil)
		expect(todos).ToEqual(dummyTodos)
	})
}
