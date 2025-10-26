# 🎓 School Management System

A comprehensive full-stack school management application built with Angular and .NET Core, featuring real-time exam functionality, user management, and course administration.

## 🎥 Demo Video
**[📺 Watch Project Demo](https://drive.google.com/file/d/YOUR_VIDEO_ID/view)** - Complete walkthrough of all features and functionality

## ✨ Features

### 🔐 Authentication & Authorization
- **Dual Role System**: Separate dashboards for Teachers (Admin) and Students
- **Secure Login**: Encrypted password storage with role-based access control
- **Route Guards**: Protected routes with automatic redirection based on user roles
- **Session Management**: Persistent login with localStorage

### 👨‍🏫 Teacher/Admin Features
- **Dashboard**: Modern, responsive admin dashboard with quick actions
- **Department Management**: Create and organize academic departments
- **Course Management**: Set up courses, schedules, and student enrollments
- **Student Management**: View and manage student records
- **Exam Creation**: Create exams with customizable duration and pass points
- **Question Management**: Add multiple-choice questions to exams
- **Real-time Exam Control**: Start/stop exams with live timer functionality

### 👨‍🎓 Student Features
- **Student Dashboard**: Personalized dashboard for enrolled courses
- **Course Enrollment**: View assigned courses and schedules
- **Exam Taking**: Interactive exam interface with real-time timer
- **Results View**: View exam results and performance analytics
- **Progress Tracking**: Monitor academic progress across courses

### 📝 Exam System
- **Timed Exams**: Configurable exam duration with real-time countdown
- **Multiple Choice Questions**: Support for A, B, C, D, E choice options
- **Automatic Grading**: Instant score calculation and pass/fail determination
- **Answer Tracking**: Detailed tracking of student answers and correct responses
- **Real-time Updates**: Live exam status updates using SignalR

### 🏢 Academic Management
- **Department Organization**: Hierarchical department structure
- **Course Scheduling**: Day and time-based course scheduling
- **Student-Course Relationships**: Many-to-many enrollment system
- **Teacher Assignment**: Course-teacher relationship management

## 🛠️ Technology Stack

### Frontend
- **Angular 17**: Modern TypeScript framework
- **PrimeNG 17**: Professional UI component library
- **PrimeFlex**: CSS utility framework
- **SignalR Client**: Real-time communication
- **RxJS**: Reactive programming
- **Chart.js**: Data visualization
- **FullCalendar**: Calendar integration

### Backend
- **.NET 8.0**: Latest .NET framework
- **ASP.NET Core Web API**: RESTful API development
- **Entity Framework Core 6.0**: ORM with SQL Server
- **AutoMapper**: Object-to-object mapping
- **SignalR**: Real-time bidirectional communication
- **Swagger/OpenAPI**: API documentation

### Database
- **SQL Server**: Relational database management
- **Entity Framework Migrations**: Database version control

### Development Tools
- **Visual Studio**: IDE for backend development
- **Angular CLI**: Command-line interface for Angular
- **Git**: Version control

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **.NET 8.0 SDK**
- **SQL Server** (LocalDB or full instance)
- **Visual Studio 2022** or **VS Code**
- **Angular CLI**: `npm install -g @angular/cli`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iremalgul/school-management-system.git
   cd school-management-system
   ```

2. **Backend Setup**
   ```bash
   cd backend/SchoolManagement
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   The API will be available at `https://localhost:7123`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ng serve
   ```
   The application will be available at `http://localhost:4200`

### Database Configuration

Update the connection string in `backend/SchoolManagement/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SchoolManagementDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

## 📊 Database Schema

### Core Entities
- **Department**: Academic departments
- **Teacher**: Faculty members with admin privileges
- **Student**: Enrolled students
- **Course**: Academic courses with scheduling
- **Exam**: Examinations with duration and pass criteria
- **ExamQuestion**: Multiple-choice questions
- **StudentExam**: Exam attempts and grades
- **StudentAnswer**: Individual question responses

### Relationships
- Department → Courses (One-to-Many)
- Teacher → Courses (One-to-Many)
- Course → Students (Many-to-Many)
- Course → Exams (One-to-Many)
- Exam → Questions (One-to-Many)
- Student → Exam Attempts (One-to-Many)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication

### Department Management
- `GET /api/department/getAll` - Get all departments
- `POST /api/department/insertDepartment` - Create department
- `POST /api/department/updateDepartment` - Update department
- `POST /api/department/deleteDepartment` - Delete department

### Course Management
- `GET /api/course/getAll` - Get all courses
- `POST /api/course/insertCourse` - Create course
- `POST /api/course/updateCourse` - Update course
- `POST /api/course/deleteCourse` - Delete course

### Exam System
- `GET /api/exam/getExamsByCourseId` - Get course exams
- `POST /api/exam/insertExam` - Create exam
- `POST /api/exam/startExam` - Start exam timer
- `POST /api/exam/submitAnswers` - Submit exam answers
- `GET /api/exam/getUserExamResults` - Get student results

## 🎯 Key Features in Detail

### Real-time Exam Timer
- **SignalR Integration**: Live countdown timer during exams
- **Automatic Submission**: Exams auto-submit when time expires
- **Real-time Updates**: Instant status updates to all connected clients

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, professional interface using PrimeNG
- **Accessibility**: WCAG compliant components

### Security Features
- **Password Encryption**: Secure password storage
- **JWT-like Authentication**: Token-based session management
- **Role-based Access**: Granular permission system

## 📱 Screenshots

### Admin Dashboard
- Modern dashboard with quick action cards
- Department, course, and student management
- Real-time exam monitoring

### Student Interface
- Clean exam-taking interface
- Real-time timer display
- Results and progress tracking

### Exam Management
- Question creation and editing
- Duration and pass point configuration
- Live exam status monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **İrem Algül** - *Initial work* - [GitHub](https://github.com/iremalgul)

## 🙏 Acknowledgments

- PrimeNG team for the excellent UI component library
- Microsoft for the .NET ecosystem
- Angular team for the robust frontend framework

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact: irem1705@gmail.com

---

**Built with ❤️ using Angular, .NET Core, and SignalR**
