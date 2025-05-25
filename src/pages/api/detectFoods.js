import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "画像データが提供されていません" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("APIキーが設定されていません");
    return res.status(500).json({ error: "APIキーが設定されていません" });
  }

  if(true){
    //ダミーデータを返す
    const dummyData = {
      foods: [
        {
          "name": "食品1",
          "weight": "1kg"
        }
      ]
    }
    return res.status(200).json(dummyData)
  }
  try {
    console.log("Gemini APIの初期化を開始");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    console.log("画像データの準備完了");

    console.log("Gemini APIへのリクエストを開始");
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: `
          この画像に写っている食品や食材を日本語でリストアップしてください。
          以下の形式で返してください：
          - 食品名1
          - 食品名2
          - 食品名3
        `,
      },
    ]);

    console.log("APIレスポンスを受信");
    const response = await result.response;
    const text = await response.text();
    console.log("認識結果:", text);

    const foods = text
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace(/^-/, "").trim())
      .filter(Boolean);

    console.log("認識された食材:", foods);

    if (foods.length === 0) {
      return res.status(200).json({ error: "食材を認識できませんでした" });
    }

    return res.status(200).json({ foods });
  } catch (err) {
    console.error("Gemini API 呼び出しエラー:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    return res.status(500).json({
      error: "Gemini API 呼び出しに失敗しました",
      details: err.message,
    });
  }
}
