import { test } from '@playwright/test';
import { trello } from './api/client';
import { CardValidator } from './api/card.validator';
import 'dotenv/config';

let cardId: string;

const boardId = process.env.TRELLO_BOARD_ID ?? '';
const listName = 'Automation List - Lab16';

async function createListOnBoard(boardId: string, listName: string): Promise<string> {
  const res = await trello.post(
    '/lists',
    new URLSearchParams({
      name: listName,
      idBoard: boardId,
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    })
  );
  return res.data.id;
}

test('Lab 16 – Full card due date lifecycle', async () => {
  const listId = await createListOnBoard(boardId, listName);

  // 1. Create Card
  const createRes = await trello.post(
    '/cards',
    new URLSearchParams({
      name: 'TestCard_Lab16',
      idList: listId,
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    })
  );
  cardId = createRes.data.id;

  // 2. Add due date
  const dueDate = new Date().toISOString();
  const addDueRes = await trello.put(
    `/cards/${cardId}/due`,
    new URLSearchParams({
      value: dueDate,
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    })
  );
  CardValidator.matchCardData(addDueRes.data, { due: dueDate });

  // 3. Update due date
  const newDueDate = new Date(Date.now() + 86400000).toISOString(); // +1 день
  const updateDueRes = await trello.put(
    `/cards/${cardId}/due`,
    new URLSearchParams({
      value: newDueDate,
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    })
  );
  CardValidator.matchCardData(updateDueRes.data, { due: newDueDate });

  // 4. Remove due date
  const deleteDueRes = await trello.put(
    `/cards/${cardId}/due`,
    new URLSearchParams({
      value: '',
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    })
  );
  CardValidator.dueShouldBeNull(deleteDueRes.data);

  // 🧹 Cleanup
  await trello.delete(`/cards/${cardId}`, {
    params: {
      key: process.env.TRELLO_API_KEY!,
      token: process.env.TRELLO_TOKEN!,
    },
  });
});
