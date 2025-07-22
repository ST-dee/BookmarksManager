namespace hmwk60reactauthbookmarksmgr.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public List <Bookmark> Bookmarks { get; set; }


        public override string ToString()
        {
            return Id + FirstName + LastName + Email ;
        }

    }
}