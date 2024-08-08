const express = require('express');
const router = express.Router(); // Crea un router express

const {todasLasTareas, tareaPorId, actualizarTarea, crearTarea, eliminarTarea} = require('../controllers/controllers.js');


router.get('/tasks', todasLasTareas); // obtener todas las tareas
router.get('/tasks/:id', tareaPorId); // obtener tarea por id
router.put('/tasks/:id', actualizarTarea); // actualizar datos de tarea
router.post('/tasks', crearTarea); // crear nueva tarea
router.delete('/tasks/:id', eliminarTarea); // eliminar tarea

// Exporta el router para poder importarlo en el archivo principal
module.exports = router;