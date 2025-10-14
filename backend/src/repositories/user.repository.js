export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async getById(userId) {
    const result = await this.database.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );
    return result.rows[0];
  }

  async getAll() {
    const result = await this.database.query("SELECT * FROM users");
    return result.rows;
  }

  async getByEmail(email) {
    const result = await this.database.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  }

  async create(userData) {
    const result = await this.database.query(
      `INSERT INTO users (name, surnames, email, password, birthdate)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userData.name,
        userData.surnames,
        userData.email,
        userData.password,
        userData.birthdate,
      ]
    );
    return result.rows[0];
  }
}
