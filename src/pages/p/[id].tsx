import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { Layout } from '@/components/Layout'
import { PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'

export const getServerSideProps: GetServerSideProps<PostProps> = async ({ params, req }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  .then((post) => {
    let ip = ""
    if (req.headers["x-forwarded-for"]) {
      const forwarded = req.headers["x-forwarded-for"]
      if (typeof forwarded === "string") {
        ip = forwarded.split(",")[0]
      } else {
        ip = forwarded[0]
      }
    } else if (req.headers["x-real-ip"]) {
      ip = req.connection.remoteAddress!
    } else {
      ip = req.connection.remoteAddress!
    }

    prisma.analytics.create({
      data: {
        access: new Date(),
        ua: req.headers["user-agent"]  || null,
        postId: post?.id || null,
        title: post?.title || null,
        referer: req.headers.referer || null,
        ipAddress: ip,
      }
    })
    return post
  })

  return {
    props: post!,
  }
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
}

const Post: NextPage<PostProps> = (props) => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <Card variant="outlined">
        <CardContent sx={{ m: 2 }}>
          <Typography variant='h4' mb={2}>{title}</Typography>
          <Divider />
          <Typography sx={{ justifyContent: "flex-end" }}></Typography>
          <ReactMarkdown>{props.content!}</ReactMarkdown>
          <CardActions>
            {!props.published && userHasValidSession && postBelongsToUser && (
              <Button
                variant="contained"
                onClick={() => publishPost(props.id)}
              >公開</Button>
            )}
            {userHasValidSession && postBelongsToUser && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => deletePost(props.id)}
              >削除</Button>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default Post