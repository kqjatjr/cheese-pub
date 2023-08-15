import Dexie from 'dexie';

export type TInstanceState = {
  id?: number;
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
  INSTANCE_STATE!: Dexie.Table<TInstanceState>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      INSTANCE_STATE: '++id, registeredaccounts',
    });

    this.INSTANCE_STATE = this.table('INSTANCE_STATE');
    console.log(this.table('INSTANCE_STATE'));
  }
}

const db = new IndexedDatabase();

// 데이터 추가
const addData = async (instanceState: TInstanceState) => {
  try {
    await db.INSTANCE_STATE.add(instanceState);
    console.log('Data added to the INSTANCE_STATE table successfully.');
  } catch (error) {
    console.error('Error adding data to the INSTANCE_STATE table:', error);
    throw error;
  }
};

export { addData };
