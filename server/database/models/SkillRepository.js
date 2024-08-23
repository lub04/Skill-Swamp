const AbstractRepository = require("./AbstractRepository");

class SkillRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "skill" as configuration
    super({ table: "skills" });
  }

  // The C of CRUD - Create operation

  async create(skill) {
    // Execute the SQL INSERT query to add a new skill to the "skill" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description) values (?, ?)`,
      [skill.name, skill.description]
    );

    // Return the ID of the newly inserted skill
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific skill by its ID
    const [rows] = await this.database.query(
      `SELECT s.*, us.level, us.experience_years FROM ${this.table} AS s INNER JOIN userskills AS us ON s.id = us.skill_id WHERE us.user_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the skill
    return rows[0];
  }

  async readMine() {
    const [rows] = await this.database.query(
      `SELECT u.id, u.skillname, u.email, u.profile_picture, u.bio, u.location, u.created_at, u.updated_at, GROUP_CONCAT(CONCAT(s.name, ': ', s.description) SEPARATOR '; ') AS skills FROM ${this.table} AS u INNER JOIN skillSkills AS us ON u.id = us.skill_id INNER JOIN Skills AS s ON s.id = us.skill_id WHERE u.is_connected = 1 GROUP BY u.id;`
    );

    return rows[0];
  }

  async readAllByUser(id) {
    // Execute the SQL SELECT query to retrieve all skills from the "skill" table
    const [rows] = await this.database.query(
      `SELECT s.*, us.level, us.experience_years FROM ${this.table} AS s INNER JOIN userskills AS us ON s.id = us.skill_id WHERE us.user_id = ?`,
      [id]
    );

    // Return the array of skills
    return rows;
  }

  async update(skill) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET skillname = ?, email = ?, bio = ?, location = ? where id = ?`,
      [skill.skillname, skill.email, skill.bio, skill.location, skill.id]
    );
    return result;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing skill

  // async update(skill) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an skill by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = SkillRepository;
