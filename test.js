const student = {
  name: "John Wick",
  course: "Software Development",
};

const key = "course";

console.log(student[key]);
// console.log(student.key); // will not work

const student2 = {
  firstName: "John",
  lastName: "Wick",

  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

console.log(student2.firstName);

console.log(student2["lastName"]);

console.log(student2.getFullName());

class Student {
  constructor(firstName, lastName, course) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.course = course;
  }

  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

const student3 = new Student("John 1", "Wick 1", "Software Development");

console.log(student3.getFullName());
