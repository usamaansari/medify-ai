import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/List";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {notes} = await req.json();

    try{
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash-lite-preview-06-17",
    messages: [
      { role: "system", content: JSON.stringify(AIDoctorAgents) },
      { role: "user", content: "User Notes/Symptoms: " + notes + ". Depends on user notes and symptoms, please suggest list of doctors, Return Object in JSON only" },
    ],
  })
  console.log(completion.choices[0].message)
  const rawResp = completion.choices[0].message || '';
  //@ts-ignore
  const Resp = rawResp.content.trim().replace('```json','').replace('```','');
  const JSONResp = JSON.parse(Resp);

  return NextResponse.json(JSONResp);
    }
    catch(e){
        console.error("Error suggesting doctors:", e);
        return NextResponse.json(e);
    }
}