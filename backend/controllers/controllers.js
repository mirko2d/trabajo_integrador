const connection = require("../database/db");

const todasLasTareas = async (req, res) => {
    const sql = 'SELECT * FROM tasks'; 
    console.log('Ejecutando consulta para obtener todas las tareas'); 
connection.query(sql, (error, results) => {
    if (error) {
        console.error('Error al obtener tarea:', error); 
        res.status(500).send('Error al obtener tarea'); 
        return; 
    }
      console.log('Tareas obtenidas:', results); 
      res.json(results); 
    });
}

const tareaPorId = async (req, res) => {
    const id = req.params.id; 
    console.log('Obteniendo tarea con ID:', id); 

    const query = `SELECT * FROM tasks WHERE id = ${id}`; 

    connection.query(query, (error, results) => {
    if (error) {
        console.error('Error al obtener tarea:', error); 
        res.status(500).send('Error al obtener tarea');
        return; 
    }

    if (!results.length) {
        console.log('Tarea no encontrada con ID:', id); 
        res.status(404).send('Tarea no encontrada'); 
        return; 
    }

      console.log('Tarea encontrado:', results[0]); 
      res.json(results[0]); 
    });
}

const crearTarea = async (req, res) => {
    console.log('req.body:', req.body);

    const { title, description, isComplete } = req.body;

    if (!title || !description || !isComplete) {
      res.status(400).send('Falta información obligatoria'); 
      return; }

    const query = `INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)`;
    const values = [title, description, isComplete]; // Valores para la consulta

    connection.query(query, values, (error, results) => {
    if (error) {
        console.error('Error al crear tarea:', error); // Registrar error en consola
        res.status(500).send('Error al crear tarea'); // Enviar respuesta de error (código 500)
        return; // Salir de la función si hay error en la consulta
    }

    res.json({ message: 'Tarea creada correctamente' });
    });
}

const actualizarTarea = async (req, res) => {
    const id = req.params.id;
    const { title, description, isComplete } = req.body;

if (!title || !description || !isComplete) {
    res.status(400).send('Falta información obligatoria'); // Enviar respuesta de error (código 400)
    return; // Salir de la función si faltan datos
}

const query = `UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?`;
const values = [title, description, isComplete, id]; // Valores para la consulta

connection.query(query, values, (error, results) => {
    if (error) {
        console.error('Error al actualizar tarea:', error); // Registrar error en consola
        res.status(500).send('Error al actualizar tarea'); // Enviar respuesta de error (código 500)
        return; // Salir de la función si hay error en la consulta
    }

      // verificar si se actualizó algún registro
    if (results.affectedRows === 0) {
        res.status(404).send('Tarea no encontrada');
        return; // Salir de la función si no se actualizó ningún registro
    }

    res.json({ message: 'Tarea actualizada correctamente' });
    });
}

const eliminarTarea = async (req, res) => {
    // se obtiene el ID del usuario a eliminar
    const id = req.params.id; // Extraer el ID del parámetro de la URL

    // hacemos la consulta SQL para eliminar el usuario
    const query = `DELETE FROM tasks WHERE id = ${id}`; // Consulta SQL para eliminar el registro con el ID especificado
    const values = [id]; // Valor para la consulta (el ID del usuario)

connection.query(query, values, (error, results) => {
    if (error) {
        console.error('Error al eliminar tarea:', error); // Registrar el error en la consola
        res.status(500).send('Error al eliminar tarea'); // Enviar respuesta de error al cliente (código HTTP 500)
        return; // Salir de la función si hay un error
    }

      // se verifica si se eliminó algún registro
    if (results.affectedRows === 0) {
        // Si no se eliminó ningún registro (es decir, no se encontró el usuario)
        res.status(404).send('Tarea no encontrada'); // Enviar respuesta de error al cliente (código HTTP 404)
        return; // Salir de la función si no se encontró el usuario
    }

      // se notifica que se realizo bien la consulta y se elimina el usuario
      res.json({ message: 'Tarea eliminada correctamente' }); // Enviar respuesta de éxito al cliente indicando que el usuario se eliminó correctamente
    });
} 

module.exports = {
    todasLasTareas,
    tareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
}