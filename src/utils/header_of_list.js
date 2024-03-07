export const studentsHeader = [
  {
    text: "Names",
    align: "start",
    sortable: false,
    value: "name"
  },
  { text: "Emails", sortable: false, value: "email" },
  { text: "Speciality", value: "speciality" },
  { text: "Grades", value: "grade" },
  { text: "Absence Rate (%)", value: "rate" },
  { text: "Passed", value: "pass" },
  { text: "Actions", value: "actions", sortable: false }
];

export const teachersHeader = [
  {
    text: "Names",
    align: "start",
    sortable: false,
    value: "name"
  },
  { text: "Emails", sortable: false, value: "email" },
  { text: "Phone Number", sortable: false, value: "phone" },
  { text: "Modules", sortable: false, value: "module" },
  { text: "Ranks", sortable: false, value: "rank" },
  { text: "Starting Date", value: "date" },
  { text: "Actions", value: "actions", sortable: false }
];

export const trainingsHeader = [
  {
    text: "Names",
    align: "start",
    sortable: true,
    value: "name"
  },
  { text: "Prices", sortable: true, value: "price" },
  {
    text: "Teachers",
    sortable: false,
    value: "teachers",
    width: "15%",
    align: "center"
  },
  {
    text: "Number of Students",
    sortable: false,
    value: "students",
    align: "center"
  },
  { text: "Actions", value: "actions", sortable: false }
];
