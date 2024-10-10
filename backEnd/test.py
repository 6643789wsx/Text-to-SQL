from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许所有来源的请求

@app.route('/generate_sql', methods=['POST'])
def generate_sql():
    user_input = request.json.get('user_input')
    # 生成 SQL 语句的逻辑
    generated_sql = f"SELECT * FROM table WHERE column = '{user_input}'"
    return jsonify({'generated_sql': generated_sql})

if __name__ == '__main__':
    app.run(port=5000)