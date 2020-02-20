using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.SignalR
{
    public class PaymentHub : Hub
    {
        public async Task SendPayment(string user, string message)
        {
            Console.WriteLine(user);
            await Clients.Client(user).SendAsync("GotAPayment", user, message);
        }
    }
}
