export default (email) =>
{
  const re =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const invalidEmails = (email => re.test(email)===false);
  if(invalidEmails)
  {
      return email;
  }
  return false;

 }