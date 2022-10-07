import { Layout } from '@/components/Layout'
import { Button, CardContent, Stack, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type FormType = {
  title: string
  content: string
}

const Draft: NextPage = () => {
  const { control, handleSubmit } = useForm<FormType>()
  const router = useRouter()

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
        }),
      })
      await router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <CardContent sx={{ backgroundColor: "white" }}>
        <Stack component="form" spacing={3} sx={{ mt: 2 }}>
          <Typography variant="h4" component="div">記事作成</Typography>
          <Controller
            control={control}
            name="title"
            defaultValue=""
            rules={{required: { value: true, message: '件名を入力してください' }}}
            render={({field, fieldState: {error}}) => (
              <TextField
                {...field}
                autoFocus
                label="タイトル"
                required
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({field}) => (
              <TextField
                {...field}
                label="内容"
                multiline
                rows={10}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
            >作成</Button>
            <Button
              color="primary"
              href='/'
            >キャンセル</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Layout>
  )
}

export default Draft