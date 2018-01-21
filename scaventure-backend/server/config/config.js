require('dotenv').config();

/** 
 * Put any API keys, urls, secrets etc here 
 *  & then define them in .env file in project root
 */
const config = {
  DB_URL: process.env.DB_URL,
  secret: process.env.JWT_SECRET,
};

export default config;