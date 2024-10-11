from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)  # 允许所有来源的请求

# MySQL 连接配置
# db_config = {
#     'host': '59.111.148.84',
#     'port': 3306,
#     'user': 'pkudt_bF963_user',
#     'password': 'jo5UkUP1gg',
#     'database': 'pkudtw-dev-countapp-EfmasN'
# }

db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '123456789',
    'database': 'mydatabase'
}

def execute_sql(sql):
    try:
        conn = pymysql.connect(**db_config)
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql)
        # cursor.execute("SELECT * FROM customers")
        result = cursor.fetchall()
        return result
    except pymysql.MySQLError as err:
        print(f"数据库错误: {err}")
        return None
    finally:
        if conn:
            cursor.close()
            conn.close()

@app.route('/generate_sql', methods=['POST'])
def generate_sql():
    user_input = request.json.get('user_input')
    # 生成 SQL 语句的逻辑
    generated_sql = f"SELECT * FROM customers WHERE name = '{user_input}'"
    
    # 执行 SQL 语句并获取结果
    result_sql = execute_sql(generated_sql)
    
    # 在终端中输出 result_sql
    print(f"Result SQL: {result_sql}")
    
    if result_sql is not None:
        return jsonify({'generated_sql': generated_sql, 'result_sql': result_sql})
    else:
        return jsonify({'generated_sql': generated_sql, 'result_sql': []}), 500

if __name__ == '__main__':
    app.run(port=5000)