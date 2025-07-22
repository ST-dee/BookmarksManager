using hmwk60reactauthbookmarksmgr.Data;
using hmwk60reactauthbookmarksmgr.Data.Migrations;
using hmwk60reactauthbookmarksmgr.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace hmwk60reactauthbookmarksmgr.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly string _cs;

        public AccountController(IConfiguration configuration)
        {
            _cs = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("signup")]
        public void SignUp(SignUpUserModel user)
        {
            var repo = new BookmarkRepos(_cs);
            repo.SignUp(user, user.Password);
        }


        [HttpPost("login")]
        public User Login(LoginModel model)
        {
 
            Console.WriteLine(model.Email  + model.Password);
            var repo = new BookmarkRepos(_cs);
            var user = repo.VerifyLogin(model.Email, model.Password);
            if (user == null)
            {
                Console.WriteLine("returning null in controller");
                return null;
            }


            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();

            Console.WriteLine("user");
            //Console.WriteLine(user);
            return user;

        }

        [HttpGet("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            { 
                return null; 
            }

            var repo = new BookmarkRepos(_cs);
            return repo.GetUserByEmail(User.Identity.Name);

        }

        [HttpPost("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }


     
    }
}
