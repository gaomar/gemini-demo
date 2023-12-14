import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import * as fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

// URLからbase64エンコードされた文字列を取得します。
async function urlToGenerativePart(url: string, mimeType: string): Promise<Part> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(arrayBuffer).toString('base64'),
      mimeType
    }

  }
}

// ローカルファイル情報を GoogleGenerativeAI.Part オブジェクトに変換します。
function fileToGenerativePart(path: string, mimeType: string): Part {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // テキストと画像の入力（マルチモーダル）には、gemini-pro-vision モデルを使用します
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "何が写っている？";

  const imageParts: Part[] = [
    fileToGenerativePart("cat.png", "image/png"),
    await urlToGenerativePart("https://1.bp.blogspot.com/-tVeC6En4e_E/X96mhDTzJNI/AAAAAAABdBo/jlD_jvZvMuk3qUcNjA_XORrA4w3lhPkdQCNcBGAsYHQ/s1048/onepiece01_luffy.png", "image/png")
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();