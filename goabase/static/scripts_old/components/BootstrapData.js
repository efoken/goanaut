function generateId(key) {
  return `_bootstrap-${key}`;
}

const data = {};

export default {
  get: (key) => {
    const id = generateId(key);
    if (id in data) {
      return data[id];
    }
    const element = document.getElementById(id);
    if (!element) {
      return null;
    }
    const content = JSON.parse(element.content);
    data[id] = content;
    return content;
  },
  set: (key, value) => {
    const id = generateId(key);
    data[id] = value;
  },
  extend: (data) => {
    Object.keys(data).forEach((id) => {
      this.set(id, data[id]);
    });
  },
};
