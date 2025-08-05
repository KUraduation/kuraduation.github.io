// English translation file
export const en = {
  // Header/Navigation
  copy: "Copy",
  paste: "Paste",
  reset: "Reset",
  addDeck: "Add Deck",
  undo: "Undo",
  redo: "Redo",
  help: "Help",
  
  // Search area
  searchByDept: "Department",
  searchByCourse: "Course Name",
  customCourse: "Add Course",
  search: "Search",
  courseName: "Course Name",
  courseCode: "Course Code",
  credit: "Credit",
  add: "Add",
  clear: "Clear",
  searchYearLabel: "Search Year",
  
  // Major selection area
  majorDiv: {
    major1: "Primary Major",
    doubleMajor: "Double Major",
    multipleMajor: "Multiple Major",
    transfer: "Transfer Student",
    convergence: "Convergence Major",
    intensive: "Intensive Major",
    studentDesigned: "Student-Designed Major"
  },
  yearLabel: "Base Year",
  majorGpa: "Major GPA",
  
  // Semester grid
  semester: {
    first: "1st",
    summer: "Sum",
    second: "2nd",
    winter: "Win"
  },
  year: "Year",
  credit: "Credit",
  gpa: "GPA",
  major: "Major",
  
  // Popup/Modal
  popup: {
    grade: "Grade",
    majorCourse: "Major Course",
    majorCourseDesc: "Include this course in major GPA calculation",
    save: "Save",
    delete: "Delete",
    close: "Close",
    confirmDelete: "Are you sure you want to delete this course?"
  },
  
  // Help
  help: {
    title: "📚 User Guide",
    content: `<p>• We recommend using devices with horizontal screens like PCs or tablets.</p>
        <p>• All records are saved in your browser and will remain unless you clear browser data.</p>
        <p>• Drag desired courses or click on courses and then click on semester cells to place them.</p>
        <p>• Click on placed courses to set grades.</p>
        <p>• Based on Korea University's educational information system from 2018 to present.<br>
            Please contact us via email if there are any issues with graduation requirements.</p>
        <p>• For changed liberal arts courses (e.g., 자정진>학세탐), they are automatically reflected, but if issues occur, please use the 'Add Custom Course' feature to set the course code directly.</p>
        <p>• For general liberal arts courses (e.g., 과어탈, 종영, etc.), please use the 'Add Custom Course' feature to add them.</p>
        <p>• For graduation requirements 'Base Year': set to entry year for multiple majors, and set to your admission year for primary major, double major, etc.</p>
        <p>• If you are taking an intensive major, do not choose primary major in graduation requirements, only choose intensive major!</p>
        <p>• Courses that apply to multiple majors are applied sequentially from the top major.</p>
        <p>• 'Excess required major credits count as major electives' applied in some departments is difficult to implement structurally. We apologize for the inconvenience.</p>
        <p>• Identical course codes are considered retakes and are reflected only once in total credit calculation.</p>
        <p>• For inquiries —> <a href="mailto:lemonplugin@gmail.com" target="_blank">lemonplugin@gmail.com</a></p>`
  },
  
  // Statistics/Chart
  stats: {
    totalCredit: "Total Credit",
    overallGpa: "Overall",
    majorGpa: "Major",
    yearCredit: "Credit",
    yearGpa: "GPA",
    yearMajor: "Major"
  },
  
  // Search results
  searchResult: {
    noResults: "No search results found.",
    addedCourses: "General Education Courses",
    takenCourse: "Already taken course"
  },
  
  // Messages
  messages: {
    confirmReset: "'s all courses will be reset. Are you sure?",
    loading: "Course data is loading. Please try again in a moment.",
    minLength: "Please enter at least 2 characters.",
    fillAllFields: "Please fill in all fields.",
    networkError: "Network Error"
  }
}; 