export const save = (key: string, value: string): void =>{
    if (!(key && value != null)) {
      throw new Error('key, value params are required');
    }
    sessionStorage.setItem(key, value);
  }
  
  export const get = (key: string): string | null=>{
    if (key === null) {
      throw new Error('key param is required');
    }
    const value = sessionStorage.getItem(key);
    if (value === null) {
      return null;
    } else {
      return value;
    }
  }

  export const remove = (key: string): void =>{
    if (key === null) {
      throw new Error('key param is required');
    }
    const value = sessionStorage.removeItem(key);
  }