export const get_users_query = `
select id, username from users;
`;

export const get_user_query = `
select username from users
where id = $1;
`;

export const check_username_or_email_query = `
select id, username, email from users 
where username = $1 or email = $2;
`;

export const check_username_and_email_query = `
select id, username, email from users 
where username = $1 and email = $2;
`;

export const post_user_query = `
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

export const delete_user_query = `
delete from users where id = $1
returning username;
`;
