import sqlite3
import os

# DB接続
sqlite_path = os.path.join("db", "C:\\Users\\user\\Desktop\\project\\studentDeta.db")
connection = sqlite3.connect(sqlite_path)
cursor = connection.cursor()

# SELECT
cursor.execute("SELECT * FROM data WHERE No = ?", (1001,))
res = cursor.fetchone()
print(res)

# DBとの接続切断
connection.close()

