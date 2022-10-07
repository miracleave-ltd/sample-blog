import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import { Layout } from '@/components/Layout'
import { PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'

export const getServerSideProps: GetServerSideProps<PostProps> = async ({ params, req }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
  })
  if (post) {
    let ip = ""
    if (req.headers["x-forwarded-for"]) {
      const forwarded = req.headers["x-forwarded-for"]
      if (typeof forwarded === "string") {
        ip = forwarded.split(",")[0]
      } else {
        ip = forwarded[0]
      }
    } else {
      ip = req.socket.remoteAddress!
    }

    await prisma.analytics.create({
      data: {
        access: new Date(),
        postId: post?.id || null,
        title: post?.title || null,
        ipAddress: ip,
        referer: req.headers.referer || null,
        location: 'jp',
        ua: req.headers["user-agent"]  || null,
      }
    })
  }

  return {
    props: post!,
  }
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
}

const Post: NextPage<PostProps> = (props) => {
  return (
    <Layout>
      <Card variant="outlined">
        <CardContent sx={{ m: 2 }}>
          <Typography variant='h4' mb={2}>{props.title}</Typography>
          <Divider />
          <Typography sx={{ justifyContent: "flex-end" }}></Typography>
          <ReactMarkdown>{props.content!}</ReactMarkdown>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deletePost(props.id)}
            >削除</Button>
          </CardActions>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default Post