#! /usr/bin/env node

import inquirer from "inquirer";

async function main() {
  const students = [];
  
  while (true) {
    // Main menu prompt
    const action = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Select an action",
        choices: ["Add Student", "View Student Details", "Exit"],
      },
    ]);

    if (action.action === "Add Student") {
      // Prompt for student details
      const studentManagement = await inquirer.prompt([
        {
          name: "student_name",
          type: "input",
          message: "Enter Student Name",
        },
        {
          name: "student_age",
          type: "number",
          message: "Enter Student Age",
        },
        {
          name: "student_class",
          type: "input",
          message: "Enter Student Class",
        },
      ]);

      // Generate a 5-digit unique student ID
      const studentID = Math.floor(Math.random() * 90000) + 10000;

      // Prompt to enroll students in the given courses
      const courses = ["HTML", "CSS", "JS", "React", "Node"];
      const courseEnrollment = await inquirer.prompt([
        {
          name: "course",
          type: "checkbox",
          message: "Select courses to enroll in",
          choices: courses,
        },
      ]);

      // Generate a random balance
      const balance = Math.floor(Math.random() * 100000);

      // Prompt for payment
      const payment = await inquirer.prompt([
        {
          name: "payment",
          type: "number",
          message: "Enter Payment",
        },
      ]);

      // Combine all details into a single student object
      const student = {
        id: studentID,
        ...studentManagement,
        enrolled_courses: courseEnrollment.course,
        balance: balance - payment.payment, // Calculate remaining balance
      };

      // Add student to the list
      students.push(student);

    } else if (action.action === "View Student Details") {
      // Check if there are students to display
      if (students.length === 0) {
        console.log("No students enrolled yet.");
      } else {
        // Display details of all students
        console.log("Student Details:");
        students.forEach((student, index) => {
          console.log(`\nStudent ${index + 1}:`);
          console.log(`ID: ${student.id}`);
          console.log(`Name: ${student.student_name}`);
          console.log(`Age: ${student.student_age}`);
          console.log(`Class: ${student.student_class}`);
          console.log(`Enrolled Courses: ${student.enrolled_courses.join(", ")}`);
          console.log(`Balance: ${student.balance}`);
        });
      }
    } else if (action.action === "Exit") {
      // Exit the loop and end the program
      break;
    }
  }
}

main();
