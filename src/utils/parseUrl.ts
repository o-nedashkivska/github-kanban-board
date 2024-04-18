export const parseUrl = (url) => {
  if (url.at(-1) === "/") {
    url = url.slice(0, -1);
  }

  const splitted = url.split("/");

  const owner = splitted.at(-2);
  const repo = splitted.at(-1);

  return { owner, repo };
};
