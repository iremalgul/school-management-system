using Microsoft.AspNetCore.SignalR;
using SchoolManagement.Services.Interfaces;
using System.Threading;

namespace SchoolManagement.Services.Impls
{
    public class SignalRService : ISignalRService
    {
        private readonly IHubContext<SchoolHub> _hubContext;

        public SignalRService(IHubContext<SchoolHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task SendMessage(string method, object message)
        {
            await _hubContext.Clients.All.SendAsync(method, message);
        }

        private System.Threading.Timer? _timer = null; // nullable
        private bool _examStarted = false;

        public async Task StartExam(int durationMinutes)
        {
            if (_examStarted)
                return; // Already started

            _examStarted = true;

            DateTime endTime = DateTime.Now.AddMinutes(durationMinutes);

            Console.WriteLine($"[Exam] Sınav başladı. Bitiş: {endTime}");

            await SendMessage("examStarted", new
            {
                EndTime = endTime
            });

            _timer = new System.Threading.Timer(async _ =>
            {
                var remaining = endTime - DateTime.Now;

                if (remaining <= TimeSpan.Zero)
                {
                    await SendMessage("examEnded", "Sınav süresi doldu");
                    Console.WriteLine("[Exam] Sınav süresi doldu.");

                    if (_timer != null)
                    {
                        await _timer.DisposeAsync(); // DisposeAsync for analyzer warning
                        _timer = null;
                    }
                    _examStarted = false;
                }
                else
                {
                    await SendMessage("examTimer", new
                    {
                        RemainingSeconds = (int)remaining.TotalSeconds
                    });

                    Console.WriteLine($"[Exam Timer] {remaining.Minutes}m {remaining.Seconds}s kaldı");
                }

            }, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }

    }
}
