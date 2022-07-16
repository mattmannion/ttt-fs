import { sql } from 'src/util/util';

export const login_query = sql`
select 
  username, 
  password
from users
where 
  username = $1
`;
