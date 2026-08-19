"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Eye, Printer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

interface ViewSummaryDialogProps {
  summary: string;
  fileName: string;
}

// Strip markdown syntax and return plain text for a line
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim();
}

const ViewSummaryDialog: React.FC<ViewSummaryDialogProps> = ({ summary, fileName }) => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 15;
    const marginY = 20;
    const contentWidth = pageWidth - marginX * 2;
    let y = marginY;

    const checkNewPage = (needed: number) => {
      if (y + needed > pageHeight - marginY) {
        pdf.addPage();
        y = marginY;
      }
    };

    const writeLine = (text: string, opts: { fontSize: number; bold?: boolean; indent?: number; color?: [number, number, number] }) => {
      pdf.setFontSize(opts.fontSize);
      pdf.setFont('helvetica', opts.bold ? 'bold' : 'normal');
      pdf.setTextColor(...(opts.color ?? [30, 30, 30]));
      const indent = opts.indent ?? 0;
      const lines = pdf.splitTextToSize(text, contentWidth - indent);
      checkNewPage(lines.length * (opts.fontSize * 0.4 + 1));
      pdf.text(lines, marginX + indent, y);
      y += lines.length * (opts.fontSize * 0.4 + 1) + 1;
    };

    const lines = summary.split('\n');
    let listCounter = 0;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const trimmed = raw.trim();

      if (!trimmed) {
        y += 2;
        inOrderedList = false;
        listCounter = 0;
        continue;
      }

      // Heading 1: # ...
      if (/^# /.test(trimmed)) {
        y += 2;
        writeLine(stripMarkdown(trimmed.replace(/^# /, '')), { fontSize: 16, bold: true, color: [15, 23, 42] });
        // Draw underline
        pdf.setDrawColor(200, 200, 200);
        pdf.line(marginX, y, pageWidth - marginX, y);
        y += 3;
        continue;
      }

      // Heading 2: ## ...
      if (/^## /.test(trimmed)) {
        y += 3;
        writeLine(stripMarkdown(trimmed.replace(/^## /, '')), { fontSize: 13, bold: true, color: [30, 41, 59] });
        y += 1;
        continue;
      }

      // Heading 3: ### ...
      if (/^### /.test(trimmed)) {
        writeLine(stripMarkdown(trimmed.replace(/^### /, '')), { fontSize: 11, bold: true, color: [51, 65, 85] });
        continue;
      }

      // Ordered list: 1. ...
      const orderedMatch = trimmed.match(/^(\d+)\. (.*)/);
      if (orderedMatch) {
        inOrderedList = true;
        listCounter = parseInt(orderedMatch[1]);
        const text = stripMarkdown(orderedMatch[2]);
        writeLine(`${listCounter}. ${text}`, { fontSize: 10, bold: /\*\*/.test(orderedMatch[2]), indent: 2 });
        continue;
      }

      // Unordered list: - ... or * ...
      const unorderedMatch = trimmed.match(/^[-*] (.*)/);
      if (unorderedMatch) {
        const text = stripMarkdown(unorderedMatch[1]);
        writeLine(`• ${text}`, { fontSize: 10, indent: inOrderedList ? 8 : 4 });
        continue;
      }

      // Nested unordered list: spaces then - or *
      const nestedMatch = trimmed.match(/^ {2,}[-*] (.*)/);
      if (nestedMatch) {
        writeLine(`  – ${stripMarkdown(nestedMatch[1])}`, { fontSize: 9.5, indent: 10, color: [75, 85, 99] });
        continue;
      }

      // Horizontal rule
      if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
        y += 2;
        pdf.setDrawColor(220, 220, 220);
        pdf.line(marginX, y, pageWidth - marginX, y);
        y += 4;
        continue;
      }

      // Plain paragraph (may contain **bold** inline)
      const isBoldLine = /^\*\*.*\*\*$/.test(trimmed) || trimmed.startsWith('**');
      writeLine(stripMarkdown(trimmed), { fontSize: 10, bold: isBoldLine });
    }

    const safeName = fileName.replace(/\.[^/.]+$/, '');
    pdf.save(`${safeName}-AI-Summary.pdf`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle>AI Summary</DialogTitle>
              <DialogDescription className="mt-1">
                AI-generated summary for: {fileName}
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="shrink-0 flex items-center gap-1.5"
            >
              <Printer className="h-4 w-4" />
              <span>Save as PDF</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4 bg-white rounded-lg border p-6">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold text-gray-700 mt-4 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside space-y-2 mb-3 pl-5">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-sm text-gray-700 leading-relaxed [&>p]:inline [&>p]:m-0">
                  {children}
                </li>
              ),
              hr: () => <hr className="my-4 border-gray-200" />,
            }}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSummaryDialog;
