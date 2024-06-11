using Microsoft.AspNetCore.Mvc;

namespace ChiffresApi.Controllers
{
    public class GamesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
