import { expect } from '@playwright/test';
import { CardResponse } from './card.response';

export class CardValidator {
  static matchCardData(actual: CardResponse, expected: Partial<CardResponse>) {
    if (expected.name) expect(actual.name).toBe(expected.name);
    if (expected.due) expect(actual.due).toContain(expected.due);
    if (expected.idList) expect(actual.idList).toBe(expected.idList);
  }

  static dueShouldBeNull(card: CardResponse) {
    expect(card.due).toBeNull();
  }
}
