const serializeNewExercise = (formData, userId) => {
  const data = { name: "", exercises: [], userId: "" };

  data.userId = userId
  console.log("serializeNewExercise - formData = ", formData);
  for (let i = 0; i < formData.length; i++) {
    const { id, value, nodeName } = formData[i];

    switch (nodeName) {
      case "INPUT":
        if (id.startsWith("description"))  {
          const exerciseIndex = id.split("_")[2];
          const exerciseDescription = value

          if (!data.exercises[exerciseIndex]) {
            data.exercises.push({ description: exerciseDescription });
          } else {
            data.exercises[exerciseIndex].description = exerciseDescription;
          }
        } else if (id.startsWith("url")) {
          const exerciseIndex = id.split("_")[2];
          const exerciseUrl = value

          if (!data.exercises[exerciseIndex]) {
            data.exercises.push({ url: exerciseUrl });
          } else {
            data.exercises[exerciseIndex].url = exerciseUrl;
          }
        }
      break

      case "SELECT":
        if (id === "type") {
          data.name = value;
        }
      break

      default:
     ;   console.log("is not input field");
    }
  }
  console.log("serializeNewExercise returning data = ", data);

  return data;
};

export { serializeNewExercise };
