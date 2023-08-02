import express from "express";
import morgan from "morgan";

import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';
import todosRoutes from './routes/todos.routes.js';

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(todosRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;

