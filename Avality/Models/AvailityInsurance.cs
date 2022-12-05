using System;
using CsvHelper.Configuration.Attributes;

namespace Availity
{
    public class AvailityInsurance
    {
        public AvailityInsurance()
        {
        }
        [Index(0)]
        public string UserId { get; set; }
        [Index(1)]
        public string FirstAndLastName { get; set; }
        [Index(2)]
        public int Version { get; set; }
        [Index(3)]
        public string InsuranceCompany { get; set; }
    }
}
