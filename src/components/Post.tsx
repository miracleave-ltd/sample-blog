import React from "react"
import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"
import { NextPage } from "next"

export type PostProps = {
  id: string
  title: string
  author: {
    name: string | null
    email: string | null
  } | null
  content: string | null
  published: boolean
}

const Post:NextPage<{ post: PostProps }> = ({ post }) => {
  const router = useRouter()
  const authorName = post.author ? post.author.name : "作成者不明"
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => router.push(`/p/${post.id}`)} >
        <CardContent  sx={{ p: 2 }}>
          <Typography  variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <ReactMarkdown>{post.content!}</ReactMarkdown>
          <Typography variant="overline" display="block" gutterBottom>
            作成者：{authorName}
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export { Post }
