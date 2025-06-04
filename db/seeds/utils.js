exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookUpObj = (comments, key, value) => {
  if (comments.length === 0) {
    return {};
  }

  let newObj = {};
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const newKey = comment[key];
    const newValue = comment[value];
    newObj[newKey] = newValue;
  }
  return newObj;
};
