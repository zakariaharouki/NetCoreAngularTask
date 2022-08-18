using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NetCoreAngularTask.Models;
using System.Security.Cryptography;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetCoreAngularTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public class UserInfo
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Dob { get; set; }
            public string Role { get; set; }
        }
        private readonly AngularTaskContext context = new AngularTaskContext();
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        [EnableCors]
        public JsonResult Post(UserInfo user)
        {
            
            User RegUser=new User();
            RegUser.Password=Helpers.AesEncryptDecrypt.EncryptPassword(user.Password);
            RegUser.Email= user.Email;
            RegUser.FirstName = user.FirstName;
            RegUser.LastName = user.LastName;
            RegUser.Role = int.Parse(user.Role);
            RegUser.Dob = DateTime.Parse(user.Dob);
            RegUser.IsApproved = false;
            context.Users.Add(RegUser);
            context.SaveChanges();
            return new JsonResult("Success");

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
