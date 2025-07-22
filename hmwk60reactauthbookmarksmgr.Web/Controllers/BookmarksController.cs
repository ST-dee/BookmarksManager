using hmwk60reactauthbookmarksmgr.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace hmwk60reactauthbookmarksmgr.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {

        private readonly string _cS;

        public BookmarksController(IConfiguration configuration)
        {
            _cS = configuration.GetConnectionString("ConStr");
        }

        [Authorize]
        [HttpPost("updatetitles")]
        public void UpdateTitles(Bookmark bookmark)
        {
            var repo = new BookmarkRepos(_cS);
            repo.UpdateTitles(bookmark);
        }

        [Authorize]
        [HttpGet("getusersbookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var repo = new BookmarkRepos(_cS);
            return repo.GetUsersBookmarks(User.Identity.Name);

        }


        [Authorize]
        [HttpPost("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepos(_cS);
            repo.DeleteBookmark(bookmark);

        }

        [Authorize]
        [HttpPost("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepos(_cS);
            repo.AddBookmark(bookmark, User.Identity.Name);

        }

        [HttpGet("gettopfivebookmarks")]
        public List<Bookmark> GetTopFiveBookmarks()
        {
            var repo = new BookmarkRepos(_cS);
            return repo.GetTopFiveBookmarks();

        }
    }
}
