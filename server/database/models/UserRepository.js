const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [user.title, user.user_id]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `SELECT u.id, u.username, u.email, u.profile_picture, u.bio, u.location, u.created_at, u.updated_at, GROUP_CONCAT(concat(s.name, ': ', s.description ) SEPARATOR '; ') AS skills FROM ${this.table} as u inner join userskills as us on u.id = us.user_id inner join skills as s on s.id = us.skill_id where u.id = ? group by u.id`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readMine() {
    const [rows] = await this.database.query(
      `SELECT u.id, u.username, u.email, u.profile_picture, u.bio, u.location, u.created_at, u.updated_at, GROUP_CONCAT(CONCAT(s.name, ': ', s.description) SEPARATOR '; ') AS skills FROM ${this.table} AS u INNER JOIN UserSkills AS us ON u.id = us.user_id INNER JOIN Skills AS s ON s.id = us.skill_id WHERE u.is_connected = 1 GROUP BY u.id;`
    );

    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(
      `SELECT u.id, u.username, u.profile_picture, u.location, GROUP_CONCAT(s.name SEPARATOR ', ') AS skills FROM ${this.table} as u inner join userskills as us on u.id = us.user_id inner join skills as s on s.id = us.skill_id where is_connected = 0 group by u.id`
    );

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
