'use client'

import { FileDown, FileText, Printer } from 'lucide-react'

const btn =
  'inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/80 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:text-white'

export function PrintButton() {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a href="/Katie-Kinkel-Resume.pdf" download className={btn} title="Download PDF resume">
        <FileDown size={16} aria-hidden />
        <span>PDF</span>
      </a>
      <a href="/Katie-Kinkel-Resume.docx" download className={btn} title="Download DOCX resume">
        <FileText size={16} aria-hidden />
        <span>DOCX</span>
      </a>
      <button type="button" onClick={() => window.print()} className={`${btn} cursor-pointer`} title="Print / save as PDF">
        <Printer size={16} aria-hidden />
        <span>Print</span>
      </button>
    </div>
  )
}
