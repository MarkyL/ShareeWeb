const serializeNewGenericQuestion = (formData, isActive) => {
  const data = { name: "", answers: [] };

  for (let i = 0; i < formData.length; i++) {
    const { id, value, nodeName } = formData[i];

    switch (nodeName) {
      case "INPUT":
        if (id === "name")  {
          data.name = value;
        }
        if (id.startsWith("questionDescription_")) {
          const questionIndex = id.split("_")[1];
          const questionDescription = value;

          data.answers[questionIndex] = questionDescription;
        }
        break

      default:
        console.log("is not input field");
    }
  };

  return data;
};

export { serializeNewGenericQuestion };
