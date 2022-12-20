import os
import sys
import psycopg2
import boto3
import json
import pandas as pd
from datetime import datetime

class Database():

    class Parameter():

        def __init__(self, host, port, dbname, table, user, password, query):
            self.host = host
            self.port = port
            self.dbname = dbname
            self.table = table
            self.user = user
            self.password = password
            self.query = query

    def __init__(self, param):
        self.db = param
        self.header = tuple()
        self.records = list()
        self.counts = int()

    def _connection(self):
        return psycopg2.connect(
            host=self.db.host,
            port=self.db.port,
            dbname=self.db.dbname,
            user=self.db.user,
            password=self.db.password
        )

    def query(self):
        with self._connection() as conn:
            with conn.cursor() as cursor:
                try:
                    cursor.execute(self.db.query)
                    self.header = cursor.description
                    print(self.header)
                    self.records = cursor.fetchall()
                    print(self.records)
                    self.counts = len(self.records)
                    print(self.counts)
                except psycopg2.Error as e:
                    print(e)
                    sys.exit()
        return True


def lambda_handler(event, context):

    param = Database.Parameter(
        host=os.getenv('DB_HOST', ''),
        port=os.getenv('DB_PORT', ''),
        dbname=os.getenv('DB_DBNAME', ''),
        table=os.getenv('DB_TABLE', ''),
        user=os.getenv('DB_USER', ''),
        password=os.getenv('DB_PASSWORD', ''),
        query=os.getenv('DB_QUERY', '')
    )

    db = Database(param=param)
    db.query()

    s3Export(db.records)
    
    return str(db.records)

def s3Export(data):
    s3 = boto3.resource('s3')
    bucket = os.getenv('S3_BUCKET', '')
    key = 'export/'+os.getenv('DB_TABLE', '')+'.csv'
    df = pd.DataFrame(data)
    obj = s3.Object(bucket,key)
    obj.put(Body=df.to_csv(None, header=False, index=False).encode("utf-8"))

    print("S3:put done")
    return
    
if __name__ == '__main__':
    print(lambda_handler(event=None, context=None))
