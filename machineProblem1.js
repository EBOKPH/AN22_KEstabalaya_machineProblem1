// ITCS227 Source Code Template for 3T AY 2022-2023
/*
  Program:     Computation of Grades using Function
  Programmer:  Kobe D. Estabalaya
  Section:     AN22
  Start Date:  June 2, 2023
  End Date:    June 2, 2023

 */

const readline = require('readline');

function getLetterGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else if (score >= 60) {
    return 'D';
  } else {
    return 'F';
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = 5;

console.log("Enter the grades of five students:");

const names = [];
const classParticipation = [];
const summativeAssessment = [];
const finalExam = [];
const grades = [];
const letterGrades = [];

function promptUser(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function readGrades(index) {
  if (index === students) {
    rl.close();
    displayResults();
    return;
  }

  const name = await promptUser("Enter the name of the student: ");
  names.push(name);

  let classPart = 0;
  for (let j = 0; j < 5; j++) {
    const enablingAssessment = parseInt(await promptUser(`Enter enabling assessment ${j + 1}: `));
    classPart += enablingAssessment;
  }
  classParticipation.push(Math.round(classPart / 5));

  let summative = 0;
  for (let j = 0; j < 3; j++) {
    const summativeAssessment = parseInt(await promptUser(`Enter summative assessment ${j + 1}: `));
    summative += summativeAssessment;
  }
  summativeAssessment.push(Math.round(summative / 3));

  const final = parseInt(await promptUser("Enter major exam grade: "));
  finalExam.push(final);

  const gradeScore = (classParticipation[index] * 0.3) + (summativeAssessment[index] * 0.3) + (finalExam[index] * 0.4);
  grades.push(Math.round(gradeScore));

  const letterGrade = getLetterGrade(gradeScore);
  letterGrades.push(letterGrade);

  readGrades(index + 1);
}

function displayResults() {
  console.log("\nName of Student\tClass Participation\tSummative Assessment\tExam Grade\tGrade Score\tLetter Grade");

  for (let i = 0; i < students; i++) {
    console.log(`${names[i]}\t\t${classParticipation[i]}\t\t${summativeAssessment[i]}\t\t${finalExam[i]}\t\t${grades[i]}\t\t${letterGrades[i]}`);
  }
}

// Start reading grades
readGrades(0);
