import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const REPORT_GEN_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on the transcript, generate a structured report with the following fields:
1. sessionid: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
"sessionld": "string".
"agent": "string",
"user": "string",
"timestamp": "ISO Date string".
"chiefComplaint": "string",
"summary": "string",
"symptoms": ['symptom1", "symptom2"]
"duration": "string",
"severity": "string".
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
}
Only include valid fields. Respond with nothing else.
`



export async function POST(req: NextRequest){
    const {sessionId, sessionDetail, messages} = await req.json();
    try{
        const UserInput = "AI Agent Doctor Info:"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-lite-preview-06-17",
            messages: [
              { role: "system", content: REPORT_GEN_PROMPT},
              { role: "user", content: UserInput },
            ],
          })
          console.log(completion.choices[0].message)
          const rawResp = completion.choices[0].message;
          //@ts-ignore
          const Resp = rawResp.content.trim().replace('```json','').replace('```','');
          const JSONResp = JSON.parse(Resp);
        const result =await db.update(SessionChatTable).set({
            report: JSONResp,
            conversation:messages
        }).where(eq(SessionChatTable.sessionId,sessionId));
       
          return NextResponse.json(JSONResp)
    }
    catch(err){
        console.log(err);
        return NextResponse.json({error: 'Failed to generate report'}, {status: 500})
    }
}