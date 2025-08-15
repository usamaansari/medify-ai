import { db } from "@/config/db";
import { SessionChatTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:NextRequest){
    const {notes, selectedDoctor} = await req.json();
    const user = await currentUser();
    try{
        const sessionId = uuidv4();
        
        const result = await db.insert(SessionChatTable).values({
            //@ts-ignore
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes:notes,
            selectedDoctor:selectedDoctor,
            createdOn: (new Date()).toString()
            //@ts-ignore
        }).returning({SessionChatTable});

        return NextResponse.json(result[0]?.SessionChatTable);
    }
    catch(e){
        console.error("Error fetching session:", e);
        return NextResponse.json(e);
    }
   
} 

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();
    try{

       if(sessionId === 'all'){
        //@ts-ignore
        const result = await db.select().from(SessionChatTable).where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(SessionChatTable.id));
        console.log(result);
        return NextResponse.json(result);
       }
       else{ 
        //@ts-ignore
       const result = await db.select().from(SessionChatTable).where(eq(SessionChatTable.sessionId, sessionId));
       console.log(result);
       return NextResponse.json(result[0]);
       }
    }
    catch(e){
        console.error("Error fetching sessions:", e);
        return NextResponse.json(e);
    }
}
