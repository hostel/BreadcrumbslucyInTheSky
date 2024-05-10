export const htmlDecode = (content: string): string => {
  let e = document.createElement('div');
  e.innerHTML = content;
  return e.childNodes.length === 0 || !e.childNodes[0].nodeValue ? '' : e.childNodes[0].nodeValue;
};
