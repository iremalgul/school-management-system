using Microsoft.AspNetCore.SignalR;

namespace SchoolManagement
{
    public sealed class SchoolHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            var id = Context.ConnectionId;
            return base.OnConnectedAsync();
        }

    }
}
