export const get_users_query = `
select id, username from users;
`;

export const get_user_query = `
select username from users
where id = $1;
`;
