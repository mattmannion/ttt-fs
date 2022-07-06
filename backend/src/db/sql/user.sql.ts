export const get_user_query = `
select username from users
where id = $1;
`;
