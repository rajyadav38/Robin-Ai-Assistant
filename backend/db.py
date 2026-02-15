import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Rajyadav2006",
    database="robin_ai"
)

cursor = conn.cursor(dictionary=True)
