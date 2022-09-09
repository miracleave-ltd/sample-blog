import React from 'react'
import { Layout } from '@/components/Layout'
import { Post, PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { Stack, Typography } from '@mui/material'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { drafts },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts: NextPage<Props> = (props) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <Typography variant="h4" sx={{ mb: 2 }}>下書きリスト</Typography>
        <Typography>このページを閲覧するには、ログインする必要があります。</Typography>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 2 }}>下書きリスト</Typography>
      <Stack spacing={2}>
        {props.drafts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Stack>
    </Layout>
  )
}

export default Drafts