const AbstractRepository = require("./AbstractRepository");

class UserSkillRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "skill" as configuration
    super({ table: "userSkills" });
  }

  // The C of CRUD - Create operation

  async create(UserSkill) {
    // Execute the SQL INSERT query to add a new skill to the "skill" table
    const [result] = await this.database.query(
      `insert into ${this.table} (skill_id, user_id, level, experience_years) values (?, ?, ?, ?)`,
      [
        UserSkill.skill_id,
        UserSkill.user_id,
        UserSkill.level,
        UserSkill.experience_years,
      ]
    );

    // Return the ID of the newly inserted skill
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  // async read(id) {
  //   // Execute the SQL SELECT query to retrieve a specific skill by its ID
  //   const [rows] = await this.database.query(
  //     `SELECT s.*, us.level, us.experience_years FROM ${this.table} AS s INNER JOIN userskills AS us ON s.id = us.skill_id WHERE us.user_id = ?`,
  //     [id]
  //   );

  //   // Return the first row of the result, which represents the skill
  //   return rows[0];
  // }

  // async update(skill) {
  //   const [result] = await this.database.query(
  //     `UPDATE ${this.table} SET skillname = ?, email = ?, bio = ?, location = ? where id = ?`,
  //     [skill.skillname, skill.email, skill.bio, skill.location, skill.id]
  //   );
  //   return result;
  // }

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

module.exports = UserSkillRepository;
