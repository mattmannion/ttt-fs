import { sql } from 'src/util/util';

export const testing_drop_users_query = sql`
drop table users;
`;

export const testing_insert_users_query = sql`
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
