## ローカル環境構築

1. 依存ライブラリインストール、Database初回セットアップを行います。  
  次のコマンドを実行してください。  
  ```sh
   docker compose run --rm --entrypoint '' app /bin/ash -c "yarn install && yarn prisma:generate && yarn prisma:deploy"
  ```
2. 必要なコンテナを立ち上げます。
  ```sh
  docker compose up -d
  ```
3. 次のURLからアクセスします。  
  http://localhost:3000

## 利用する環境変数

- DATABASE_URL: PostgreSQL接続文字列

## 注意事項

- コンテナビルド時、データベース接続が必要となります。  
  CIなどでビルドする際は、データベースと接続できるネットワークでビルドするようにしてください。
- ビルド時は、`DATABASE_URL`の環境変数が必要となります。