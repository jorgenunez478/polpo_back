import { pool } from "../db.js";

//capturar todos los registros
export const getTodos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM todos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//capturar un registro
export const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
        const [rowsTask] = await pool.query("SELECT * FROM tasks WHERE todoId = ?", [id]);
    
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
    
        let result = rows[0];
        if (rowsTask.length > 0) 
            result.todos = rowsTask;

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//crear un registro
export const createTodo = async (req, res) => {
    try {
        const {title, keywords, userId } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO todos (title, keywords, userId) VALUES (?,?,?)",
            [title, keywords, userId]
        );
        res.status(201).json({ id: rows.insertId, title, keywords, userId });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//actualizar un registro
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, keywords, userId } = req.body;
    
        const [result] = await pool.query(
            "UPDATE todos SET title = IFNULL(?, title), keywords = IFNULL(?, keywords), userId = IFNULL(?, userId) WHERE id = ?",
            [title, keywords, userId, id]
        );
    
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Todo not found" });
    
        const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
    
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//eliminar un registro
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//extra
export const createTodosTask = async (req,res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
    
        const [rows] = await pool.query(
            "INSERT INTO tasks (title, completed, todoId, userId) VALUES (?,?,?,?)",
            [title, completed, id, id]
        );
        res.status(201).json({ id: rows.insertId, title, completed, "todoId":id, "userId":id });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}