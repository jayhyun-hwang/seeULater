package ui_test

import "seeULater/goServers/entities"

type Service interface {
	GetAllTodos() ([]entities.Todo, error)
}
