import { sql } from 'src/util/util';

export const util_truncate_tables_query = sql`
truncate users;
`;

export const util_alter_tables_query = sql`
alter sequence users_id_seq restart; 
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
('matt', 'mannion', 'mm@mm.com', 'mm', $1),
('mack', 'gr', 'mgr@mgr.com', 'mgr', $2),
('khris', 'rhodes', 'kr@kr.com', 'kr', $3);
`;

export const util_replace_user_query = sql`
insert into users( 
  firstname,       
  lastname,        
  email,           
  username,        
  password         
)
values ('khris', 'rhodes', 'kr@kr.com', 'kr', $1);
`;

export const util_delete_user_query = sql`
delete from users where email = 'dt@dt.com';
`;
