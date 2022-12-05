using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Availity.Controllers
{
    [Route("api")]
    [ApiController]
    [EnableCors("CORSPolicy")]
    public class HomeController : ControllerBase
    {
        [HttpPost]
        [Route("FileUpload")]
        public IActionResult Index([FromForm] FileUpload file)
        {
            List<AvailityInsurance> records = new List<AvailityInsurance>();
            if (file.File.FileName.EndsWith(".csv"))
            {
                using var sreader = new StreamReader(file.File.OpenReadStream());
                using var csv = new CsvHelper.CsvReader(sreader, System.Globalization.CultureInfo.InvariantCulture);
                records = csv.GetRecords<AvailityInsurance>().ToList();
                List<AvailityInsurance> result = new List<AvailityInsurance>();
                for(int i =0;i< records.Count; i++)
                {
                    if (!result.Any())
                    {
                        result.Add(records[i]);
                    }
                    else {
                        var res = result.Where(g => g.UserId == records[i].UserId && g.InsuranceCompany == records[i].InsuranceCompany).FirstOrDefault();
                        if(res != null)
                        {
                            if(res.Version < records[i].Version)
                            {
                                res.FirstAndLastName = records[i].FirstAndLastName;
                                res.Version = records[i].Version;
                            }
                        }
                        else
                        {
                            result.Add(records[i]);
                        }
                    }
                }
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("CheckLisp")]
        public IActionResult CheckLisp([FromBody] Dictionary<string,string> str)
        {
            StringBuilder strb = new StringBuilder();
            foreach(var i in str["body"].Where(g => new List<char> {'}','{', '[',']','(',')'}.Contains(g)).ToList())
            {
                strb.Append(i);
            }
            return Ok(IsValid(strb.ToString()));
        }

        private bool IsValid(string input)
        {
            Stack<char> s = new Stack<char>();
            char[] arr = input.ToCharArray();
            int i = 0;
            //bool match = false;
            while (i < input.Length)
            {
                if (arr[i] == '{' || arr[i] == '(' || arr[i] == '[')
                    s.Push(arr[i]);

                if (arr[i] == '}' || arr[i] == ')' || arr[i] == ']')
                {

                    if (s.Count == 0)
                    {
                        return false;
                    }
                    else if (IsMatching(s.Pop(), arr[i]))
                    {
                        return true;
                    }

                    return false;
                }
                i++;
            }

            if (s.Count == 0)
            {
                return true;
            }

            return false;

        }

        private bool IsMatching(char character1, char character2)
        {
            if (character1 == '(' && character2 == ')')
            {
                return true;
            }
            else if (character1 == '{' && character2 == '}')
            {
                return true;
            }
            else if (character1 == '[' && character2 == ']')
            {
                return true;
            }

            return false;
        }
    }
}
