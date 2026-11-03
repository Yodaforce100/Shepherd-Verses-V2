'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

interface BetaNoticeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BetaNoticeModal({ open, onOpenChange }: BetaNoticeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-sm sm:max-w-md rounded-2xl bg-white p-6 sm:p-8 text-center gap-0"
        style={{ border: '0.5px solid #D5CDB8', boxShadow: '0 8px 30px rgba(0,28,95,0.15)' }}
      >
        <DialogTitle className="sr-only">Back very soon</DialogTitle>
        <DialogDescription
          className="font-serif text-lg sm:text-xl leading-relaxed text-pretty mb-6"
          style={{ color: '#001C5F' }}
        >
          {"\u{1F64F} Thank you for being here. We're making a few updates to Shepherd Verses and will be back very soon. Please check back shortly. \u{1F49B}"}
        </DialogDescription>
        <DialogClose
          className="mx-auto w-full sm:w-auto sm:px-12 font-sans font-medium text-sm sm:text-[15px] py-3 rounded-full hover:opacity-90 transition-opacity"
          style={{
            background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
            color: '#001C5F',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
