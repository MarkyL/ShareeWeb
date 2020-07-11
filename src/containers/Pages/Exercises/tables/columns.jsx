const buildExercisesTypesColumns = () => {
  return [
    { name: "#", selector: "id", sortable: true },
    { name: "סוג", selector: "type", sortable: true },
  ];
};

export {
  buildExercisesTypesColumns
};
