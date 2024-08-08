const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tasks_db'
});
if (connection) {
    console.log('se conectó correctamente a la base de datos');
} else {
    console.error('fallo en conectar la base de datos:', error);
}

module.exports = connection;


