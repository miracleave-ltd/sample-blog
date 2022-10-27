import json
import time
import boto3

# Redshift接続情報
CLUSTER_NAME='redshift-cluster-1'
DATABASE_NAME='dev'
DB_USER='awsuser'

# 実行するSQLを設定
sql = '''
    copy {テーブル名} from 's3://{バケット名}/export/*.csv' credentials 'aws_iam_role=arn:aws:iam::{AWSアカウントID}:role/redshift-role' csv;
'''

def lambda_handler(event, context):
    # Redshiftにクエリを投げる。非同期なのですぐ返ってくる
    data_client = boto3.client('redshift-data')
    result = data_client.execute_statement(
        ClusterIdentifier=CLUSTER_NAME, 
        Database=DATABASE_NAME,
        DbUser=DB_USER,
        Sql=sql,
    )

    # 実行IDを取得
    id = result['Id']

    # クエリが終わるのを待つ
    statement = ''
    status = ''
    while status != 'FINISHED' and status != 'FAILED' and status != 'ABORTED':
        statement = data_client.describe_statement(Id=id)
        status = statement['Status']
        time.sleep(1)

    # 結果の表示
    if status == 'FINISHED':
        if int(statement['ResultSize']) > 0:
            # select文等なら戻り値を表示
            statement = data_client.get_statement_result(Id=id)
            print(json.dumps(statement['Records']))
        else:
            # 戻り値がないものはFINISHだけ出力して終わり
            print('QUERY FINSHED')
    elif status == 'FAILED':
        # 失敗時
        print('QUERY FAILED\n{}'.format(statement))
    elif status == 'ABORTED':
        # ユーザによる停止時
        print('QUERY ABORTED: The query run was stopped by the user.')
