import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Newspaper } from 'lucide-react'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment';    
type props = {
  record: SessionDetail
}
const ViewReportDialog = ({record}:props) => {
    const report: any = record?.report;
    const formatDate = moment(record?.createdOn).format('YYYY-MM-DD HH:mm:ss');
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant={"outline"}><Newspaper />View Report</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle asChild>
        <h2 className='text-center text-2xl'>Medical AI Voice Assitant</h2>
      </DialogTitle>
      <DialogDescription asChild>
       <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Medical Session Report</h1>
      <div className="flex gap-3">
        <button onClick={()=>window.print()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">Print</button>
      </div>
    </div>

    <div className="bg-white shadow rounded-xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase">Session ID</div>
          <div id="sessionId" className="font-semibold">{record.sessionId}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase">Agent</div>
          <div id="agent" className="font-semibold">{record.selectedDoctor.specialist}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase">User</div>
          <div id="user" className="font-semibold">{record.createdBy}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-500 uppercase">Timestamp</div>
          <div id="timestamp" title="2025-08-14T01:37:47Z" className="font-semibold">{formatDate}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Chief Complaint</h2>
          <p id="chiefComplaint" className="font-medium mb-4">{report?.chiefComplaint}</p>

          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p id="summary" className="mb-4">{report?.summary}</p>

          <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
          <ul id="recommendations" className="list-disc list-inside space-y-1">
           {report?.recommendations.map((recommend:any, index:number)=>(
            <li key={index}>{recommend}</li>
           ))}
          </ul>
          <p className="text-sm text-gray-500 mt-4">This report is informational and not a substitute for professional medical advice.</p>
        </div>

        <aside>
          <h2 className="text-lg font-semibold mb-2">Symptoms</h2>
          <div id="symptoms" className="flex flex-wrap gap-2 mb-4">
             <ul id="recommendations" className="list-disc list-inside space-y-1">
           {report?.symptoms.map((symptom:any, index:number)=>(
            <li key={index}>{symptom}</li>
           ))}
          </ul>
          </div>

          <h2 className="text-lg font-semibold mb-2">Duration</h2>
          <div id="duration" className="font-medium mb-4">{report?.duration}</div>

          <h2 className="text-lg font-semibold mb-2">Severity</h2>
          <div id="severity" className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 mb-4">{report?.severity}</div>

          <h2 className="text-lg font-semibold mb-2">Medications Mentioned</h2>
          <div id="medications" className="flex flex-wrap gap-2">
             {report?.medicationsMentioned.map((medications:any, index:number)=>(
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">{medications}</span>
              ))}
          </div>
        </aside>
      </div>
    </div>
  </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default ViewReportDialog