'use client'

import { FileDown, FileText, Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href="/Katie-Kinkel-Resume.pdf"
        download
        className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        title="Download PDF resume"
      >
        <FileDown size={16} aria-hidden />
        <span>PDF</span>
      </a>
      <a
        href="/Katie-Kinkel-Resume.docx"
        download
        className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40"
        title="Download DOCX resume"
      >
        <FileText size={16} aria-hidden />
        <span>DOCX</span>
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40"
        title="Print / save as PDF"
      >
        <Printer size={16} aria-hidden />
        <span>Print</span>
      </button>
    </div>
  )
}
