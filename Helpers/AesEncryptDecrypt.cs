using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
namespace NetCoreAngularTask.Helpers
{
    public class AesEncryptDecrypt
    {
        public static string secretKey = "@123secretkeydontshare";
        public static string EncryptPassword(string password)
        {
            try
            {
                var EncryptedPassword=BCrypt.Net.BCrypt.EnhancedHashPassword(password);
                return EncryptedPassword;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }

        }
        public static bool DecryptPassword(string encryptedPassword,string plaintextPassword)
        {
            try
            {
                var DecryptedPassword = BCrypt.Net.BCrypt.EnhancedVerify(plaintextPassword,encryptedPassword);
                return DecryptedPassword;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }
    }
}
