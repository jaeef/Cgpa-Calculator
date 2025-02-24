let courses = [];

function addCourse() {
    const courseName = document.getElementById('courseName').value;
    const credits = parseInt(document.getElementById('credits').value);
    const grade = document.getElementById('grade').value;
    const points = gradeToPoint(grade) * credits;

    courses.push({ courseName, credits, grade, points });
    updateTable();
}

function gradeToPoint(grade) {
    const scale = { 'A+': 4.00, 'A': 3.75, 'B+': 3.50, 'B': 3.25, 'C+': 3.00, 'C': 2.75, 'D+': 2.50, 'D': 2.25, 'F': 0.00 };
    return scale[grade] || 0;
}

function updateTable() {
    const tableBody = document.getElementById('coursesTable');
    tableBody.innerHTML = '';
    let totalCredits = 0, totalPoints = 0;

    courses.forEach((course, index) => {
        totalCredits += course.credits;
        totalPoints += course.points;
        tableBody.innerHTML += `
            <tr>
                <td>${course.courseName}</td>
                <td>${course.credits}</td>
                <td>${course.grade}</td>
                <td>${course.points.toFixed(2)}</td>
                <td><button onclick="removeCourse(${index})">❌</button></td>
            </tr>`;
    });

    document.getElementById('currentGPA').textContent = (totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00');
    document.getElementById('totalCredits').textContent = totalCredits;
}

function removeCourse(index) {
    courses.splice(index, 1);
    updateTable();
}

function calculateFinalCGPA() {
    const previousCredits = parseFloat(document.getElementById('previousCredits').value) || 0;
    const previousGPA = parseFloat(document.getElementById('previousGPA').value) || 0;
    const totalCredits = previousCredits + courses.reduce((sum, c) => sum + c.credits, 0);
    const totalPoints = (previousGPA * previousCredits) + courses.reduce((sum, c) => sum + c.points, 0);

    document.getElementById('finalCGPA').textContent = (totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00');
}
