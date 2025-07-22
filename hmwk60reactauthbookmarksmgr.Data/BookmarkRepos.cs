using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hmwk60reactauthbookmarksmgr.Data
{
    public class BookmarkRepos
    {
        private readonly string _cS;

        public BookmarkRepos(string cS)
        {
            _cS = cS;
        }

        //public User GetUserByEmail(string Email)

        public User VerifyLogin(string email, string password)
        {
            var user = GetUserByEmail(email);
            Console.WriteLine("user from repos");
            if(user == null)
            {
                Console.WriteLine("user is null in repos verifylogin");
                return null;
            }

            Console.WriteLine(user);
            if ( !!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }


            return user;
        }

        public void SignUp(User user, string password)
        {        
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            user.Email = user.Email.ToLower();
           
            var ctx = new BookmarksDataContext(_cS);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public List<Bookmark> GetTopFiveBookmarks()
        {
            var ctx = new BookmarksDataContext(_cS);

            var bookmarks = ctx.Bookmarks.ToList();
            HashSet<string> urls = bookmarks.Select(b => b.Url).ToHashSet();
            List<Bookmark> bookmarksWCounts = new List<Bookmark>(urls.Select(u => new Bookmark { Count = 0, Url = u }));


            foreach (Bookmark uniqueBookmark in bookmarksWCounts)
            {
                foreach (Bookmark bookmark in bookmarks)
                {
                    if (bookmark.Url == uniqueBookmark.Url)
                    {
                        uniqueBookmark.Count++;
                    }
                }
            }

            var sortedList = bookmarksWCounts.OrderByDescending(bm => bm.Count).ToList();
            return new List<Bookmark> { sortedList[0], sortedList[1], sortedList[2], sortedList[3], sortedList[4] };



        }

        public List<Bookmark> GetUsersBookmarks(string email)
        {
            var id = GetUserByEmail(email).Id;
            var ctx = new BookmarksDataContext(_cS);
            return ctx.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void AddBookmark(Bookmark bookmark, string email)
        {
            bookmark.UserId = GetUserByEmail(email).Id;

            var ctx = new BookmarksDataContext(_cS);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public void DeleteBookmark(Bookmark bookmark)
        {
            var ctx = new BookmarksDataContext(_cS);
            ctx.Bookmarks.Remove(bookmark);
            ctx.SaveChanges();
        }

        public User GetUserByEmail(string email)
        {
            var ctx = new BookmarksDataContext(_cS);
            email = email.ToLower();
           return  ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public void UpdateTitles(Bookmark bookmark)
        {
            var ctx = new BookmarksDataContext(_cS);
            ctx.Bookmarks.Update(bookmark);
            ctx.SaveChanges();
        }

        //public List<Bookmark> GetTopFiveBookmarks()
        //{
        //    var ctx = new BookmarksDataContext(_cS);
        //    var bms = ctx.Bookmarks.Select(b => new Bookmark { Url = b.Url, Title = b.Title, Count = ctx.Bookmarks.Where(bm => bm.Url == b.Url).Count() }).OrderByDescending(bmark=> bmark.Count).ToHashSet().ToList();
        //    return new List<Bookmark> { bms[0], bms[1], bms[2], bms[3], bms[4] };
        //}










































    }
}
