import { Router } from "express";
import {getUsers, getUser, createUser, updateUser, deleteUser, getUsersTodo} from '../controllers/users.controller.js'; 

const router = Router();

/** lista de rutas */

//crear un usuario
router.post('/users', createUser);

//capturar todos los usuarios
router.get('/users', getUsers);

//capturar un usuario por id
router.get('/users/:id', getUser);

//actualizar un usuario
router.put('/users/:id', updateUser);

//eliminar un usuario
router.delete('/users/:id', deleteUser);

//extra
router.get('/users/:id/todos', getUsersTodo)

export default router;