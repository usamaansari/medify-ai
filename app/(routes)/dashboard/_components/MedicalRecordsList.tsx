import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, MessageSquare } from 'lucide-react';
import moment from 'moment';    
import ViewReportDialog from './ViewReportDialog';
import ViewSummaryDialog from './ViewSummaryDialog';

// Interface for uploaded medical records
interface UploadedMedicalRecord {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  summary: string;
  originalContent: string;
  createdBy: string;
  createdOn: string;
}

type MedicalRecordsListProps = {
  medicalRecords: SessionDetail[];
  uploadedRecords?: UploadedMedicalRecord[];
}

const MedicalRecordsList = ({medicalRecords, uploadedRecords = []}: MedicalRecordsListProps) => {
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-6">
      

      {/* Uploaded Medical Records */}
      {uploadedRecords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Uploaded Medical Records</h3>
          <Table>
            <TableCaption>Your uploaded medical documents and AI-generated summaries.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedRecords.map((record: UploadedMedicalRecord) => (
                <TableRow key={`uploaded-${record.id}`}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    {record.fileName}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {record.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">
                      {record.summary ? (
                        <span className="text-sm text-gray-600">
                          {record.summary.length > 100 
                            ? `${record.summary.substring(0, 100)}...` 
                            : record.summary
                          }
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">No summary available</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {record.summary && (
                        <ViewSummaryDialog 
                          summary={record.summary} 
                          fileName={record.fileName}
                        />
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(record.fileUrl, record.fileName)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* Consultation Records */}
      {medicalRecords.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Consultation History</h3>
          <Table>
            <TableCaption>Your consultation history with medical specialists.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Medical Specialist</TableHead>
                <TableHead>Consultation Notes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecords.map((record: SessionDetail, index: number) => (
                <TableRow key={`consultation-${index}`}>
                  <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
                  <TableCell className="max-w-xs truncate">{record.notes}</TableCell>
                  <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ViewReportDialog record={record}/>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default MedicalRecordsList