export const isIE = () => {
  const agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('trident') !== -1 || agent.indexOf('msie') !== -1;
};

export const isEdge = () => {
  const agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('edge') !== -1;
};

export const isEmpty = (value: any) => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (value != null && typeof value === 'object' && !Object.keys(value).length)
  );
};

export const dataURItoBlob = (dataURI: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split('')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const repeat = (fn: (args?: any) => void, times: number) => {
  fn();
  times && --times && repeat(fn, times);
};
