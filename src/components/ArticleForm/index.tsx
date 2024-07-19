import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChangeEvent, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ArticlesContext } from '../../Contexts/ArticlesContext'

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  cover: z.instanceof(FileList),
})


interface ArticleFormProps {
  setOpen?: (open: boolean) => void
}




export function ArticleForm(props: ArticleFormProps) {

  const articleContext = useContext(ArticlesContext);
  const [sendCover, setSendCover] = useState("");


  function setCoverFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return "";
    const imageFile = e.target.files[0];
    // const base64Image = window.btoa(e!.target.files[0]);
    // setSendCover(base64Image);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const result = e!.target?.result
      if (typeof result == "string") setSendCover(result);
    })

    reader.readAsDataURL(imageFile);
  }


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      cover: undefined,
      content: ""
    }
  })

  function handleArticleSubmit(article: z.infer<typeof formSchema>) {
    const { title, content, cover } = article;
    console.log({ title, content, cover, sendCover });
    const newContent = content.replace(/\n/gi, '  \n');
    articleContext!.addArticle({ id: uuidv4(), title, content: newContent, cover: sendCover });
    form.reset()
    if (props?.setOpen) {
      props.setOpen(false);
    }
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data)
          handleArticleSubmit(data)
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
        {/* Input type="file" has to be uncontrolled, hence I'm using this structure, instead of the shadcn FormFiel */}
        <Input
          type="file"
          accept="img/*"
          {...form.register("cover")}
          onChange={(event) => {
            setCoverFile(event);
          }}
        />

        {form.formState.errors?.cover && <p>{form.formState.errors.cover.message} </p>}

        {/* <FormField
          control={form.control}
          name="cover"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                
                <Input
                  type="file"
                  accept="img/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  {...fieldProps} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */ }

        <Button type="submit" variant={'default'} className={`bg-green-600 hover:bg-green-650 focus:bg-green-700 hover:scale-105 focus:scale-105`} >Save Article</Button>

      </form>

    </Form>
  )
}