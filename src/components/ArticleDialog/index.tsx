import { ArticleForm } from '../ArticleForm';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'


export function AritcleDialog() {

  const [open, setOpen] = useState(false);





  return (

    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button>
          + New Article
        </Button>
      </DialogTrigger>
      <DialogContent
        className='gap-2 p-6 bg-slate-200 rounded-xl max-w-fit'
      >
        <DialogHeader>
          <DialogTitle>
            Add your programming related article
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <ArticleForm setOpen={setOpen} />

      </DialogContent>
    </Dialog >

  )
}