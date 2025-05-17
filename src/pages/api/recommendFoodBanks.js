import { GoogleGenAI, Type } from "@google/genai";


export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }
    const { prefecture, city, donationTarget } = req.body;



    const genAIClient = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const prompt = `
      あなたはフードバンクの専門家です。
      以下の条件に合う日本国内のフードバンクを1〜3件レコメンドしてください。

      条件:
      - 県: ${prefecture}
      - 市: ${city}
      - 希望の寄付先: ${donationTarget}

      返答形式は以下のJSON形式にしてください。
      [
        {
          "name": "フードバンク名",
          "pref": "県名",
          "city": "市町村名",
          "target": "受け入れ対象",
          "url": "公式サイトURL"
        }
      ]
      `;

      try {

    // const result = await genAIClient.models.generateContent({
    //   model: "gemini-2.0-flash-001",
    //   contents: [{ role: "user", parts: [{ text: prompt }] }],
    //   config: {
    //     responseMimeType: "application/json",
    //     responseSchema: { // JSONスキーマでのレスポンス形式を指定
    //       type: Type.ARRAY,
    //       items: {
    //         type: Type.OBJECT,
    //         properties: {
    //           name: {
    //             type: Type.STRING,
    //           },
    //           pref: {
    //             type: Type.STRING,
    //           },
    //           city: {
    //             type: Type.STRING,
    //           },
    //           target: {
    //             type: Type.STRING,
    //           },
    //           url: {
    //             type: Type.STRING,
    //           },
    //         },
    //         propertyOrdering: ["name", "pref", "city", "target", "url"],
    //       },
    //     },
    //   },
    // });

    // console.log(result.candidates[0]?.content.parts[0]?.text)

    
    const dummyResponse = `[
      {
        "name": "フードバンク埼玉",
        "pref": "埼玉県",
        "city": "所沢市",
        "target": "食品全般",
        "url": "https://example.com/foodbank1"
      },
      {
        "name": "フードバンク東京",
        "pref": "東京都",
        "city": "新宿区",
        "target": "缶詰、乾物",
        "url": "https://example.com/foodbank2"
      }
    ]`

    // const responseText = result.candidates[0]?.content.parts[0]?.text;
    const responseText = dummyResponse

    const foodBanks = JSON.parse(responseText);

    res.status(200).json(foodBanks);

    } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
    }   
}

