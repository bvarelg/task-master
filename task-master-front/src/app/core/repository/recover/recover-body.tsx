export const recoverBody = { email: ""};

export function validateRecoverBody(
  register: typeof recoverBody
): String | typeof recoverBody {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (register.email == "") return "Email is Empty";
  if (!expression.test(register.email)) return "Email is Incorrect";
  return register;
}
  