export const getCombinedType = (types) =>
  types.reduce((backgroundColor, type) => {
    backgroundColor += type.type.name;
    return backgroundColor;
  }, "");
