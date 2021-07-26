package usecases

import "seeULater/goServers/entities"

type TodosRepository interface {
	GetAllTodos() ([]entities.Todo, error)
}
