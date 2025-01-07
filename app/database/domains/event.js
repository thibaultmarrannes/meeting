const client = require('../db')



/* 

example call of a DB query for the event domain

const Event = {
  async logEvent(id) {
    const result = await client.query('INSERT INTO events (goal_id, event_date, score) VALUES ($1, $2, $3)', [id, new Date(), value]);
    return result
  }
};

*/

module.exports = Event;