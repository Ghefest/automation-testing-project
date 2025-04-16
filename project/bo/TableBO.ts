import { TablePO } from '../po/TablePO';

export class TableBO {
  constructor(private table: TablePO) {}

  async goto() {
    await this.table.goto();
    return this;
  }

  async openForm() {
    await this.table.getAddNewRecordButton().click();
    return this;
  }

  async fillForm(
    firstName: string,
    userEmail: string,
    age: number,
    salary: number,
    department: string,
    lastName: string
  ) {
    await this.table.getFirstNameInput().fill(firstName);
    await this.table.getLastNameInput().fill(lastName);
    await this.table.getUserEmailInput().fill(userEmail);
    await this.table.getAgeInput().fill(age.toString());
    await this.table.getSalaryInput().fill(salary.toString());
    await this.table.getDepartmentInput().fill(department);
    return this;
  }

  async submit() {
    await this.table.getSubmitButton().click();
    return this;
  }

  async verifyUserVisible() {
    await this.table.getUserRow().waitFor({ state: 'visible' });
    return this;
  }
}
