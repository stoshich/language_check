const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config()

// Создаем подключение и базу данных

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
})
connection.query('CREATE DATABASE IF NOT EXISTS input_db', function (err, results) {
    if (err) console.log('Ошибка при создании бд', err)
    else console.log('База данных создана')
})
connection.query('USE input_db')

// Создаем таблицу

const sql = `create table if not exists input_table(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date BIGINT,
    text VARCHAR(255) 
)`

connection.query(sql, function (err) {
    if (err) console.log('Ошибка при создании таблицы', err)
    else console.log('Таблица создана')
})

module.exports = connection.promise()