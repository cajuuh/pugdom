export const removeHtmlTags = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export const formatServerUrl = (url: string) => {
  return url
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split("@")[0];
};
