export function InternalError(error: unknown) {
  return {
    json: {
      status: 'failure',
      msg: (<Error>error).message,
    },
    code: 500,
  };
}

export function time_stamp(): string {
  const t = new Date();
  return `>> ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
}
