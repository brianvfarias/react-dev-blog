import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ArticlesContext } from '../../Contexts/ArticlesContext'

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  // cover: z.any(),
})


export function AritcleDialog() {
  const articleContext = useContext(ArticlesContext);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // cover: "",
      content: ""
    }
  })

  function addArticle(article: z.infer<typeof formSchema>) {
    const { title, content } = article;
    const newContent = content.replace(/\n/gi, '  \n');
    articleContext!.addArticle({ id: uuidv4(), title, content: newContent });
    form.setValue("title", "");
    form.setValue("content", "");
    setOpen(false);
  }

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
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit((data) => {
              addArticle(data)
            })}
            className='flex flex-col gap-3'
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: How to center a div" className='mb-4' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your article goes here!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>


              )}
            />

            {/* <FormField
              control={form.control}
              name="cover"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Cover</FormLabel>
                    <FormControl>
                      <Input {...field} type='file' accept='image/*' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            /> */}


            <Button type="submit" variant={'default'} className={`bg-green-600 hover:bg-green-650 focus:bg-green-700 hover:scale-105 focus:scale-105`} >Save Article</Button>


          </form>

        </Form>


      </DialogContent>
    </Dialog >

  )
}