export const get_users_query = `
select id, username from users;
`;

export const get_user_query = `
select username from users
where id = $1;
`;

export const post_check_username_query = `
select username, email from users where username = $1 or email = $2;
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
