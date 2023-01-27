import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  for (const url of req.body) {
    await res.revalidate(url);
  }
  res.status(200).json({ revalidate: true });
}
