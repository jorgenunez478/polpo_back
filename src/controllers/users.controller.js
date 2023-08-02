import { pool } from "../db.js";

//capturar todos los registros
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//capturar un registro
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    
        if (rows.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//crear un registro
export const createUser = async (req, res) => {
    try {
        const {firstName, lastName, email} = req.body;
        const [rows] = await pool.query(
            "INSERT INTO users (firstName, lastName, email) VALUES (?,?,?)",
            [firstName, lastName, email]
        );
        res.status(201).json({ id: rows.insertId, firstName, lastName, email });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//actualizar un registro
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
    
        const [result] = await pool.query(
            "UPDATE users SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email = IFNULL(?, email) WHERE id = ?",
            [firstName, lastName, email, id]
        );
    
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "User not found" });
    
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

//eliminar un registro
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getUsersTodo = (req,res) => {
    try {
        const {id} = req.params;
        const result = [{id: 1,
            title: "Universidad", keywords: ["estudios", "importante", "academia"],
            userId: id}, {id: 2, title: "Casa", keywords: ["oficio", "necesario", "orden"],
            userId: id}];
        res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}