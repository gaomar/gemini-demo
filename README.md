# gemini-demo
このプロジェクトは `bun init` を使用して作成されました。  
[Bun](https://bun.sh) は高速なオールインワン JavaScript ランタイムです。

## API KEY
[Google AI Studio](https://makersuite.google.com/app/apikey)からAPI KEYを取得してください。

`.env.local`ファイルを新規作成し、以下のようにAPI KEYを設定してください。

```
API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## インストール

```
bun install
```

## テキスト応答

```
bun run chat.ts
```

## 画像解析応答

```
bun run vision.ts
```