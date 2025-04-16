import { RegisterPO } from '../../po/RegisterPO';
import { TablePO } from '../../po/TablePO';
import { BasePageFactory } from '../classes/page-factory.base';

export class PageFactory extends BasePageFactory<RegisterPO> {
  register() {
    return new RegisterPO(this.page);
  }

  table() {
    return new TablePO(this.page);
  }
}
