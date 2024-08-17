import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET(req) {
    return NextResponse.json(
      { error: "Method not allowed" },
      {
        status: 405
      }
    );
  }
  
  export async function POST(req) {
    try {
        const { prompt } = req.body
        const { data } = req.body
        const anthropic = new Anthropic({
          // defaults to process.env["ANTHROPIC_API_KEY"]
        });
        const msg = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: data,
            messages: [
              {
                "role": "user",
                "content": [
                  {
                    "type": "text",
                    "text": `${prompt}`
                  //From the given data of shirts and pants, suggest a 5 date outfits for me, My height is 6ft , i have brownish skin tone, indian origin, black hair, slim body under 12000rs from the given data also provide the image links
                  }
                ]
              }
            ]
          });
      return NextResponse.json(msg, {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error },
        {
          status: 500,
        }
      );
    }
}