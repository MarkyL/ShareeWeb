const serializeNewPoll = (formData, isActive) => {
  const data = { pollSections: [], isGeneralPoll: true, isActive: isActive };

  for (let i = 0; i < formData.length; i++) {
    const { id, value, nodeName, selectedOptions } = formData[i];
    console.log("formData = id = ",id, ", value = ",value,", nodeName = ",nodeName);
    switch (nodeName) {
      case "INPUT":
        if (id === "name")  {
          data.name = value;
        }
        if (id.startsWith("question")) {
          const sectionId = id.split("_")[1];

          if (!data.pollSections[sectionId]) {
            data.pollSections.push({ name: "", questions: [] });
          }
          data.pollSections[sectionId].questions.push({ name: "", question: value });
        } else if (id.startsWith("section_name")) {
            const sectionId = id.split("_")[2];

            if (!data.pollSections[sectionId]) {
                data.pollSections.push({ name: value, questions: [] });
            } else {
                data.pollSections[sectionId].name = value;
            }
        }
        break

      case "SELECT":
        if (id === "subtype") {
          data.type = value;
          data.isGeneralPoll = selectedOptions[0].attributes["sub-type"].value === "isGeneralPoll" ? true : false;
        } else if (id.startsWith("question")) {
          const sectionId = id.split("_")[1];
          const questionId = id.split("_")[2];

          const type = value.split("_")[0];
          const typeName = value.split("_")[1];

          data.pollSections[sectionId].questions[questionId].type = type;
          data.pollSections[sectionId].questions[questionId].name = typeName;
        }
        break

      default:
        console.log("is not input field");
    }
  };

  console.log(data.pollSections[0].questions);
  return data;
};

export { serializeNewPoll };
