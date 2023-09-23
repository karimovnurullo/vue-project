export const isValidToken = (value: string | undefined) => {
  return /^[a-zA-Z]{16}$/.test(value!);
};

export const timer = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};
