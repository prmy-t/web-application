const defaultState = {
  subjects: [
    [
      "Physics",
      "Mathematics-1",
      "Elements of Mechanical Engineering",
      "Workshop - Electronics"
    ],
    [
      "Environmental Studies",
      "Basic Electronics",
      "Fundamentals of Programming",
      "Engineering Graphics"
    ],
    [
      "Digital Logic & Design",
      "Operating System",
      "Data Structures",
      "Discrete Mathematics"
    ],
    [
      "Database Management System",
      "Python Programming",
      "Microprocessor",
      "Numerical Analysis & Statistical Methods"
    ],
    [
      "Design and Analysis of Algorithm",
      "Theory of Computation",
      "Disaster Management",
      "Mobile Communication"
    ],

    [
      "Wireless Networks And Mobile Computing",
      "Principles Of Compiler Design",
      "Advanced Web Technology",
      "Information Security"
    ],

    ["Software Engineering", "Parallel and Distributed Computing"],
    ["Big Data Analytics", "Software Testing and Quality Assurance"]
  ]
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  }
};
