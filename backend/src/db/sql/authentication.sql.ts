export const login_query = `
select 
  id, 
  username 
from users
where 
  username = $1
  and
  password = $2;
`;
