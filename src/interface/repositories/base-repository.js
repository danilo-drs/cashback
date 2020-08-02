module.exports = class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    if (new.target === BaseRepository) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    if (!this.checkType()) {
      throw new TypeError('Must override all methods');
    }
    this.params = {
      TableName: process.env.AGENT_TABLE_NAME,
    };
  }

  checkType() {
    let isRepository = typeof (this.get) === 'function';
    isRepository = isRepository && typeof (this.getById) === 'function';
    isRepository = isRepository && typeof (this.save) === 'function';
    isRepository = isRepository && typeof (this.saveMany) === 'function';
    return isRepository;
  }
};
