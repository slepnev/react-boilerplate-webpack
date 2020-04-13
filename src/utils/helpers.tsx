
export const downloadFile = (blob: Blob, name: string, bom: boolean = false, type: string = 'text/csv;charset=utf-8') => {
  const url = window.URL.createObjectURL(new Blob([bom ? '\ufeff' + blob : blob], {type}));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${name}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode && link.parentNode.removeChild(link);
};


