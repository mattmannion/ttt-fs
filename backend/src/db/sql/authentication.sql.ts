import { sql } from 'src/util/util';

export const login_query = sql`
select 
  id, 
  username 
from users
where 
  username = $1
  and
  password = $2;
`;
