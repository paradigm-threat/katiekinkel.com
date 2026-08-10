'use client'

import { FileDown, FileText, Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href="/Katie-Kinkel-Resume.pdf"
        download
        className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
        title="Download PDF resume"
      >
        <FileDown size={16} aria-hidden />
        <span>PDF</span>
      </a>
      <a
        href="/Katie-Kinkel-Resume.docx"
        download
        className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:border-primary hover:text-primary"
        title="Download DOCX resume"
      >
        <FileText size={16} aria-hidden />
        <span>DOCX</span>
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:border-primary hover:text-primary"
        title="Print / save as PDF"
      >
        <Printer size={16} aria-hidden />
        <span>Print</span>
      </button>
    </div>
  )
}
