import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

// PUT /api/publish/:id
const publish = async (req: NextApiRequest, res: NextApiResponse) => {

  const postId = req.query.id
  if (typeof postId == "string") {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    })
    res.json(post)
  }
}

export default publish