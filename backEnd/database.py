import pymysql


db = pymysql.connect(host='localhost', user='root', password='6643789', db='mydatabase', port=3306)
# 创建游标对象
cursor = db.cursor()

# 创建一个名为"customers"的数据表
cursor.execute("CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))")

# 插入记录
sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
values = [("John Smith", "123 Main St"), ("Alice Johnson", "456 Elm St")]
cursor.executemany(sql, values)
db.commit()

# 查询记录
cursor.execute("SELECT * FROM customers")
results = cursor.fetchall()
for row in results:
    print(row)

# 更新记录
sql = "UPDATE customers SET address = %s WHERE name = %s"
values = ("789 Oak St", "Alice Johnson")
cursor.execute(sql, values)
db.commit()

# 删除记录
sql = "DELETE FROM customers WHERE name = %s"
values = ("John Smith",)
cursor.execute(sql, values)
db.commit()

# 关闭游标和数据库连接
cursor.close()
db.close()