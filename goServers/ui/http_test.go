package ui_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"seeULater/goServers/entities"
	"seeULater/goServers/ui"
	"testing"
)

type MockService struct {
	err   error
	todos []entities.Todo
}

func (s MockService) GetTodos() ([]entities.Todo, error) {
	if s.err != nil {
		return nil, s.err
	}
	return s.todos, nil
}

func TestHTTP(t *testing.T) {
	service := &MockService{
		err: fmt.Errorf("something wrong"),
	}
	w := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "http://mwebsite.com/", nil)

	server := ui.NewHTTP()

	server.UseService(service)

	server.ServeHTTP(w, r)
}
