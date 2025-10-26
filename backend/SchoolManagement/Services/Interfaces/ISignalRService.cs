namespace SchoolManagement.Services.Interfaces
{
    public interface ISignalRService
    {
        Task SendMessage(string method, object message);
        Task StartExam(int durationMinutes); // Update signature
    }
}
