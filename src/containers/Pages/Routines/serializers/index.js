const serializeNewRoutine = (formData, isActive) => {
  const data = { name: "", weekdayActivities: [], weekendActivities: [], isActive: isActive };

  for (let i = 0; i < formData.length; i++) {
    const { id, value, nodeName, selectedOptions, name } = formData[i];

    switch (nodeName) {
      case "INPUT":
        if (id === "name")  {
          data.name = value;
        }
        if (id.startsWith("activityDescription")) {
          const activityType = id.split("_")[1];
          const activityIndex = id.split("_")[2];
          const activityDescription = value;

          if (activityType === "weekdayActivities") {
            if (!data.weekdayActivities[activityIndex]) {
              data.weekdayActivities.push({ activityDescription: activityDescription, startTime: "", endTime: "" });
            } else {
              data.weekdayActivities[activityIndex].activityDescription = activityDescription;
            }
          } else {
            // type = weekendActivities
            if (!data.weekendActivities[activityIndex]) {
              data.weekendActivities.push({ activityDescription: activityDescription, startTime: "", endTime: "" });
            } else {
              data.weekendActivities[activityIndex].activityDescription = activityDescription;
            }
          }
        } else if (name.startsWith("activityTime")) {
            const isStartTime = name.split("_")[1];
            const activityType = name.split("_")[2];
            const activityIndex = name.split("_")[3];
            const activityTime = value;

            if (activityType === "weekdayActivities") {
              if (isStartTime === "Start") {
                if (!data.weekdayActivities[activityIndex]) {
                  data.weekdayActivities.push({ activityDescription: "", startTime: activityTime, endTime: ""});
                } else {
                  data.weekdayActivities[activityIndex].startTime = activityTime;
                }
              } else {
                // isEndTime
                if (!data.weekdayActivities[activityIndex]) {
                  data.weekdayActivities.push({ activityDescription: "", startTime: "", endTime: activityTime});
                } else {
                  data.weekdayActivities[activityIndex].endTime = activityTime;
                }
              }
            } else {
              // weekendActivities
              if (isStartTime === "Start") {
                if (!data.weekendActivities[activityIndex]) {
                  data.weekendActivities.push({ activityDescription: "", startTime: activityTime, endTime: ""});
                } else {
                  data.weekendActivities[activityIndex].startTime = activityTime;
                }
              } else {
                // isEndTime
                if (!data.weekendActivities[activityIndex]) {
                  data.weekendActivities.push({ activityDescription: "", startTime: "", endTime: activityTime});
                } else {
                  data.weekendActivities[activityIndex].endTime = activityTime;
                }
              }
            }
        }
        break

      case "SELECT":
        if (id === "type") {
          data.type = value;
          data.isGeneralPoll = selectedOptions[0].attributes["sub-type"].value === "isGeneralPoll" ? true : false;
        } else if (id.startsWith("question")) {
          const sectionId = id.split("_")[1];
          const questionId = id.split("_")[2];

          data.pollSections[sectionId].questions[questionId].type = value;
        }
        break

      default:
        console.log("is not input field");
    }
  };

  return data;
};

export { serializeNewRoutine };
