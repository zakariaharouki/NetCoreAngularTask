using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAngularTask.Models;
using System.Security.Cryptography;
using Effortless.Net.Encryption;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetCoreAngularTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly AngularTaskContext context = new AngularTaskContext();
        public class LoginCredentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        // GET: api/<MainController>
        [HttpGet]
        [Route("[action]")]
        public JsonResult GetAllUsers()
        {
            var Users = context.Users.ToList();
            return new JsonResult(Users);
        }
        [HttpGet]
        [Route("[action]")]
        public JsonResult GetUser(string Email)
        {
            var user = context.Users.Where(x => x.Email == Email).FirstOrDefault();
            return new JsonResult(user);
        }

        [HttpPost]
        [EnableCors]
        public string post(LoginCredentials loginCredentials)
        {
            
            string Email = loginCredentials.Email;
            string Password = loginCredentials.Password;
            var user = context.Users.Where(x => x.Email == Email && x.IsApproved == true).FirstOrDefault();
            
            if (user!=null && user.Id > 0)
            {
                var PasswordVerified = Helpers.AesEncryptDecrypt.DecryptPassword(user.Password, Password);
                if (PasswordVerified)
                {
                    if (user.Role == 1)
                    {
                        return "Success:Admin";
                    }
                    else if (user.Role == 2)
                    {
                        return "Success:User";
                    }
                    else
                    {
                        return "Success:Guest";
                    }
                }
                else
                {
                    return "Failed";
                }
               
            }
            else
            {
                return "Not Approved";
            }
        }
        // PUT api/<MainController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpGet]
        [Route("[action]")]
        public JsonResult DeleteUser(int id)
        {
            User user = new User { Id = id };
            context.Attach(user);
            context.Remove(user);
            context.SaveChanges();
            return new JsonResult("Success");
        }
        [HttpGet]
        [Route("[action]")]
        public JsonResult ApproveUser(int id)
        {

            var user = context.Users.Where(x => x.Id == id).FirstOrDefault();
            user.IsApproved = true;
            context.SaveChanges();
            return new JsonResult("Success");
        }
    }
}
