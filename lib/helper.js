export const geminiModels = [
  {
    name: "Gemini 1.5 Flash",
    model: "gemini-1.5-flash",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description:
      "Fast and versatile performance across a diverse variety of tasks",
  },
  // {
  //   name: "Gemini 1.5 Flash-8B",
  //   model: "gemini-1.5-flash-8b",
  //   inputModalities: ["Audio", "Images", "Videos", "Text"],
  //   outputModality: "Text",
  //   description: "High volume and lower intelligence tasks",
  // },
  {
    name: "Gemini 1.5 Pro",
    model: "gemini-1.5-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description: "Complex reasoning tasks requiring more intelligence",
  },
  {
    name: "Gemini 1.0 Pro",
    model: "gemini-1.0-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"], // Assuming same as 1.5 Pro – please verify if needed.
    outputModality: "Text", // Assuming same as 1.5 Pro – please verify if needed.
    description: "", //Description not given. Consider adding based on known information about 1.0 Pro.
  },
];
