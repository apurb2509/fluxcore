import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getRecentLogs = async (req, res) => {
  try {
    const logs = await prisma.emailLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};