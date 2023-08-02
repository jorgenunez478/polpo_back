import { Router } from "express";
import {getTodos, getTodo, createTodo, updateTodo, deleteTodo, createTodosTask} from '../controllers/todos.controller.js'; 

const router = Router();

/** lista de rutas */

//crear un usuario
router.post('/todos', createTodo);

//capturar todos los usuarios
router.get('/todos', getTodos);

//capturar un usuario por id
router.get('/todos/:id', getTodo);

//actualizar un usuario
router.put('/todos/:id', updateTodo);

//eliminar un usuario
router.delete('/todos/:id', deleteTodo);

//extra
router.post('/todos/:id/task', createTodosTask)

export default router;