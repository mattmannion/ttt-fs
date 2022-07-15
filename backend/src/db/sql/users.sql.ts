import { sql } from 'src/util/util';

export const get_users_query = sql`
select id, username from users;
`;

export const get_user_query = sql`
select * from users
where id = $1;
`;

export const check_username_or_email_query = sql`
select id, username, email from users 
where username = $1 or email = $2;
`;

export const check_username_and_email_query = sql`
select id, username, email from users 
where username = $1 and email = $2;
`;

export const post_user_query = sql`
insert into users(
  firstname,
  lastname,
  email,
  username,
  password
)
values(
  $1,
  $2,
  $3,
  $4,
  $5
)
returning username;
`;

export const delete_user_query = sql`
delete from users where id = $1
returning username;
`;

export const put_user_query = sql`
update users
set 
firstname = $2,
lastname = $3,
password = $4
where id = $1;
`;
