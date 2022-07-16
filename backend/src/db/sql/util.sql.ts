import { sql } from 'src/util/util';

export const util_drop_users_query = sql`
drop table users;
`;

export const util_insert_users_query = sql`
insert into users( 
  firstname,       
  lastname,        
  email,           
  username,        
  password         
)
values
('matt', 'mannion', 'mm@mm.com', 'mm', 'mm'),
('mack', 'gr', 'mgr@mgr.com', 'mgr', 'mgr'),
('khris', 'rhodes', 'kr@kr.com', 'kr', 'kr');
`;

export const util_replace_user_query = sql`
insert into users( 
  firstname,       
  lastname,        
  email,           
  username,        
  password         
)
values ('khris', 'rhodes', 'kr@kr.com', 'kr', 'kr');
`;
