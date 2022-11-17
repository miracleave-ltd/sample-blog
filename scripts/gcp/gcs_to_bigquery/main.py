import os
from google.cloud import bigquery


def handler(event, context):
    table_id = os.environ['TABLE_ID']
    bucket = event['bucket']
    filename = event['name']
    file_uri = f"gs://{bucket}/{filename}"
    client = bigquery.Client()
    job_config = bigquery.LoadJobConfig()
    job_config.source_format = bigquery.SourceFormat.CSV
    job_config.write_disposition = bigquery.WriteDisposition.WRITE_TRUNCATE
    load_job = client.load_table_from_uri(
        file_uri, table_id, job_config=job_config
    )
    load_job.result()