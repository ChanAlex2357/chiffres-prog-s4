using ChiffresApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChiffresApi.Controllers
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public String Create(){
            Game game = new Game();
            return Json(game).ToString();
        }
    }
}
