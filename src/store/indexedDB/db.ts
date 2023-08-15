import Dexie from 'dexie';

export type TInstanceState = {
  registeredaccounts?: TInstance;
};

export type TAccount = {
  id: string;
  instance: string;
  token: {
    access_token: string;
    created_at: number;
    scope: string;
    token_type: string;
  };
  isSelected: boolean;
  username: string;
};

export type TInstance = {
  accounts: TAccount[];
};

export class IndexedDatabase extends Dexie {
  INSTANCE_STATE: Dexie.Table<TInstanceState, number>;

  constructor() {
    super('MyDatabase');

    // this.version(1).stores({
    //   registeredaccounts: '++id',
    // });

    this.INSTANCE_STATE = this.table('INSTANCE_STATE');
  }
}

const db = new IndexedDatabase();

// 데이터 추가
const addData = (instanceState: TInstanceState) => {
  return db.INSTANCE_STATE.add(instanceState);
};

export { addData };
