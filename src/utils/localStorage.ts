export const loadStorage = (name: string) => {
  try {
    const serialized = localStorage.getItem(name);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return null;
  }
};

export const saveStorage = (name: string, data: any) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(name, serialized);
  } catch {
    // ignore write errors
  }
};

export const removeStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch {
    // ignore write errors
  }
};
