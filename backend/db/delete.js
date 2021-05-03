const deleteUser = (str) => {
  return `delete from user where name="${str}"`
}

export default deleteUser;