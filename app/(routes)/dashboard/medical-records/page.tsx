"use client";

import React, { useEffect, useState } from 'react'
import MedicalRecordsList from '../_components/MedicalRecordsList'
import axios from 'axios';
import { SessionDetail } from '../medical-agent/[sessionId]/page';
import Image from 'next/image';
import NewConsultDialog from '../_components/NewConsultDialog';
import UploadMedicalRecord from '../_components/UploadMedicalRecord';

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

const MedicalRecords = () => {
    const [medicalRecords, setMedicalRecords] = useState<SessionDetail[]>([]);
    const [uploadedRecords, setUploadedRecords] = useState<UploadedMedicalRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        GetMedicalRecords();
        GetUploadedRecords();
    },[]);

    const GetMedicalRecords = async()=>{
        try {
            const result = await axios.get('/api/session-chat?sessionId=all');
            console.log('Consultation records:', result.data);
            setMedicalRecords(result.data);
        } catch (error) {
            console.error('Error fetching consultation records:', error);
        }
    }

    const GetUploadedRecords = async()=>{
        try {
            const result = await axios.get('/api/medical-records');
            console.log('Uploaded records:', result.data);
            setUploadedRecords(result.data);
        } catch (error) {
            console.error('Error fetching uploaded records:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleUploadSuccess = () => {
        // Refresh the uploaded records list after successful upload
        GetUploadedRecords();
    }

    const hasAnyRecords = medicalRecords.length > 0 || uploadedRecords.length > 0;

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Medical Records</h2>
                    <p className="text-muted-foreground">Loading your medical records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold tracking-tight">Medical Records</h2>
                    <UploadMedicalRecord onUploadSuccess={handleUploadSuccess} />
                </div>
                <p className="text-muted-foreground">
                    View and manage your medical consultation history and uploaded records.
                </p>
            </div>
            
            {hasAnyRecords ? (
                <MedicalRecordsList 
                    medicalRecords={medicalRecords} 
                    uploadedRecords={uploadedRecords}
                />
            ) : (
                <div className='flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-2xl mt-5'>
                    <Image src={"/medical-assistance.png"} alt="No Medical Records" width={150} height={150}/>
                    <h2 className='text-center font-bold'>No Medical Records Found</h2>
                    <p className='text-center'>Upload your medical documents or start a consultation to get started</p>
                </div>
            )}
        </div>
    )
}

export default MedicalRecords