namespace SchoolManagement.Models
{
    public class UserModel
    {
        public int id{ get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string? name { get; set; }
        public string? number { get; set; } // Only for students
        public bool? isAdmin { get; set; }
        public string? message{ get; set; }
        public bool? success { get; set; }
    }
}
