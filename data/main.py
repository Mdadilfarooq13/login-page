# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
import json

with open('data.json', 'r') as file:
    data = json.load(file)

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change to the allowed origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return data

# @app.post("/save")
# async def save_table_data(request: Request):
#     data = await request.json()
#     with open("data.json", 'w') as json_file:
#         json.dump(data, json_file, indent=4)
#     return {"message": "Data saved successfully"}

import pymssql

# Connection details
server = 'localhost'
database = 'master'
username = 'sa'
password = 'Mssql786#'

# Connect to the SQL Server
try:
    conn = pymssql.connect(server=server, user=username, password=password, database=database)
    print("Connected to SQL Server successfully.")
except Exception as e:
    print(f"Failed to connect to SQL Server: {e}")
    exit()

cursor = conn.cursor()

# SQL query to create a table
create_table_query = '''
CREATE TABLE ExampleTable (
    [key] INT PRIMARY KEY,
    column1 INT,
    column2 INT,
    column3 INT
);
'''

# Execute the query to create the table
try:
    cursor.execute(create_table_query)
    conn.commit()
    print("Table 'ExampleTable' created successfully.")
except Exception as e:
    print(f"Failed to create table: {e}")
    conn.rollback()

# SQL query to insert data
insert_query = '''
INSERT INTO ExampleTable ([key], column1, column2, column3)
VALUES (%d, %d, %d, %d);
'''

# Insert each row of data into the table
try:
    for row in data:
        cursor.execute(insert_query, (int(row["key"]), int(row["column1"]), int(row["column2"]), int(row["column3"])))
    conn.commit()
    print("Data inserted successfully.")
except Exception as e:
    print(f"Failed to insert data: {e}")
    conn.rollback()

# Close the connection
conn.close()

