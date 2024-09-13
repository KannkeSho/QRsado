from flask import *
from datetime import datetime as dt
import sqlite3
import os

app = Flask(__name__)



@app.route("/")
def top_pege():
    return render_template('readQR.html')

@app.route("/sadokinnzann")
def sadokinnzann():
    return render_template('sadokinnzann.html')

@app.route("/kitazawa")
def kitazawa():
    return render_template('kitazawa.html')

@app.route("/oonogame")
def oonogame():
    return render_template('oonogame.html')

@app.route("/sennkakuwann")
def sennkakuwann():
    return render_template('sennkakuwann.html')

@app.route("/hutatugame")
def hutatugame():
    return render_template('hutatugame.html')

@app.route("/usagi")
def usagi():
    return render_template('usagi.html')



def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/post', methods=['POST'])
def receive_post():

    # 現在の時間を取得
    current_time = dt.now().strftime('%Y-%m-%d %H:%M:%S')

    # POSTリクエストからuserIdを受け取る
    user_id = request.form.get('userId')
    
    if user_id is None:
        return jsonify({"error": "userId is missing"}), 400
    
    # データベースに接続
    sqlite_path = os.path.join("db", "C:\\Users\\user\\Desktop\\project\\studentDeta.db")
    connection = sqlite3.connect(sqlite_path)

    connection.row_factory = dict_factory #辞書型指定

    cursor = connection.cursor()

    # データベースからuserIdに対応するデータを取得
    cursor.execute("SELECT * FROM data WHERE No = ?", (user_id,))
    res = cursor.fetchone()
    print(user_id)

    # DBとの接続切断
    connection.close()


    if res is None:
        return jsonify({"error": "No data found for userId"}), 404

 
    #pprint.pprint(res)

    # 結果に現在の時間を追加
    res['current_time'] = current_time

    return jsonify(res)      

if __name__ =="__main__":
    app.run(debug=True, host='0.0.0.0', port=8888, threaded=True)

