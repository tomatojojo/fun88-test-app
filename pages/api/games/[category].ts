// pages/api/games/[category].ts
import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for each tab
const mockData: { [key: string]: { id: number; name: string; description: string; provider: string }[] } = {
  START: [],
  NEW: [
    { id: 1, name: 'New Game 1', description: 'New exciting game!', provider: 'Provider A' },
    { id: 2, name: 'New Game 2', description: 'Try your luck with new game!', provider: 'Provider B' },
    { id: 3, name: 'New Game 3', description: 'A fresh and fun game!', provider: 'Provider C' },
    { id: 4, name: 'New Game 4', description: 'Explore new challenges!', provider: 'Provider A' },
  ],
  SLOTS: [
    { id: 1, name: 'Slot Game 1', description: 'Spin the wheel and win!', provider: 'Provider B' },
    { id: 2, name: 'Slot Game 2', description: 'Slot machine game for big wins!', provider: 'Provider A' },
  ],
  LIVE: [
    { id: 1, name: 'Live Game 1', description: 'Live game with real dealers!', provider: 'Provider C' },
    { id: 2, name: 'Live Game 2', description: 'Play live with other players!', provider: 'Provider A' },
    { id: 3, name: 'Live Game 3', description: 'Live game for the ultimate experience!', provider: 'Provider B' },
  ],
  JACKPOT: [
    { id: 1, name: 'Jackpot Game 1', description: 'Try your luck at the jackpot!', provider: 'Provider B' },
    { id: 2, name: 'Jackpot Game 2', description: 'Win big with the jackpot!', provider: 'Provider A' },
    { id: 3, name: 'Jackpot Game 3', description: 'Your chance at hitting the jackpot!', provider: 'Provider C' },
  ],
};

// API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;  // Get the category from the URL
  const categoryName = category?.toString().toUpperCase();  // Ensure it's uppercase

  if (!categoryName || !mockData[categoryName]) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const modifiedData = mockData[categoryName as keyof typeof mockData].map((game) => ({
    ...game,
    uniqueId: `${categoryName}-${game.id}`, // Add unique id for each game
  }));

  if (categoryName === 'START') {
    // Combine the START category with all other categories
    const combinedGames = [
      ...mockData.NEW,
      ...mockData.SLOTS,
      ...mockData.LIVE,
      ...mockData.JACKPOT,
    ].map((game) => ({
      ...game,
      uniqueId: `START-${game.id}-${game.name}`,
    }));

    return res.status(200).json(combinedGames);
  }

  return res.status(200).json(modifiedData);
}
